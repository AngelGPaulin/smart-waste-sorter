import os
import numpy as np
import json
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from pyModbusTCP.client import ModbusClient
import logging
import threading

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static/uploads'
MODEL_PATH = 'predictions/modelo_residuos.h5'
LABELS_PATH = 'predictions/labels.json'
IMG_SIZE = 150
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
model = load_model(MODEL_PATH)
with open(LABELS_PATH, 'r') as f:
    labels = json.load(f)
idx_to_class = {int(v): k for k, v in labels.items()}

modbus_client = ModbusClient(host='172.29.48.1', port=502)
ARM_STATUS = {}
WASTE_TO_COILS = {
    "battery":   {"arm": 5,  "belt": 4,  "delay": 1.5},
    "cardboard": {"arm": 7,  "belt": 6,  "delay": 3.2},
    "electronic":{"arm": 9,  "belt": 8,  "delay": 4},
    "glass":     {"arm": 11, "belt": 10, "delay": 6},
    "metal":     {"arm": 13, "belt": 12, "delay": 8.5},
    "organico":   {"arm": 15, "belt": 14, "delay": 10.5},
    "paper":     {"arm": 17, "belt": 16, "delay": 12.5},
    "plastic":   {"arm": 19, "belt": 18, "delay": 14.5},
    "tetrapak":  {"arm": 21, "belt": 20, "delay": 16.2},
    "trash":     {"arm": 23, "belt": 22, "delay": 17.4}
}
EMITTER_COIL = 24

def activate_belt(belt_coil):
    try:
        if not modbus_client.is_open:
            if not modbus_client.open():
                logging.error(f"Error al abrir conexión para la banda (Coil {belt_coil}): {modbus_client.last_error()}")
                return False
        if modbus_client.write_single_coil(belt_coil, True):
            time.sleep(0.5)
            modbus_client.write_single_coil(belt_coil, False)
            logging.info(f"✅ Banda (Coil {belt_coil}) activada y desactivada")
            return True
        else:
            logging.error(f"Error al escribir al Coil {belt_coil} (Banda): {modbus_client.last_error()}")
            return False
    except Exception as e:
        logging.error(f"Error al activar la banda (Coil {belt_coil}): {str(e)}")
        return False
    finally:
        if modbus_client.is_open:
            modbus_client.close()

def activate_arm(arm_coil, waste_type):
    global ARM_STATUS
    try:
        if not modbus_client.is_open:
            if not modbus_client.open():
                logging.error(f"Error al abrir conexión para el brazo (Coil {arm_coil}): {modbus_client.last_error()}")
                return False

        if waste_type not in ARM_STATUS or not ARM_STATUS[waste_type]:
            logging.info(f"⚙️ Activando brazo (Coil {arm_coil}) para {waste_type}")
            if modbus_client.write_single_coil(arm_coil, True):
                ARM_STATUS[waste_type] = True
                time.sleep(1)
                modbus_client.write_single_coil(arm_coil, False)
                ARM_STATUS[waste_type] = False
                logging.info(f"✅ Brazo (Coil {arm_coil}) para {waste_type} activado y desactivado")
                return True
            else:
                logging.error(f"Error al escribir al Coil {arm_coil} (Brazo) para {waste_type}: {modbus_client.last_error()}")
                return False
        else:
            logging.info(f"Brazo para {waste_type} ya está activo.")
            return True
    except Exception as e:
        logging.error(f"Error al activar el brazo (Coil {arm_coil}) para {waste_type}: {str(e)}")
        return False
    finally:
        if modbus_client.is_open:
            modbus_client.close()

def trigger_emitter():
    try:
        if not modbus_client.is_open:
            if not modbus_client.open():
                logging.error(f"Error al abrir conexión para el emisor (Coil {EMITTER_COIL}): {modbus_client.last_error()}")
                return False
        if modbus_client.write_single_coil(EMITTER_COIL, True):
            time.sleep(0.2)
            modbus_client.write_single_coil(EMITTER_COIL, False)
            logging.info("✅ Emisor activado")
            return True
        else:
            logging.error(f"Error al escribir al Coil {EMITTER_COIL} (Emisor): {modbus_client.last_error()}")
            return False
    except Exception as e:
        logging.error(f"Error al activar el emisor: {str(e)}")
        return False
    finally:
        if modbus_client.is_open:
            modbus_client.close()

def delayed_action(waste_type):
    if waste_type in WASTE_TO_COILS:
        delay = WASTE_TO_COILS[waste_type]["delay"]
        arm_coil = WASTE_TO_COILS[waste_type]["arm"]
        belt_coil = WASTE_TO_COILS[waste_type]["belt"]

        logging.info(f"⚡ Activando emisor para {waste_type}")
        trigger_emitter()

        logging.info(f"⏳ Esperando {delay} segundos antes de activar banda y brazo")
        time.sleep(delay)

        if activate_belt(belt_coil):
            activate_arm(arm_coil, waste_type)
        else:
            logging.error(f"Error al activar la banda para {waste_type}")
    else:
        logging.warning(f"No hay configuración para el tipo de residuo: {waste_type}")

@app.route('/')
def hello():
    return jsonify({"message": "🧠 Microservicio IA activo"})

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No se encontró imagen'}), 400

    image = request.files['image']
    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    img = load_img(image_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    class_index = int(np.argmax(prediction))
    predicted_label = idx_to_class[class_index]

    logging.info(f"Predicción de la IA: {predicted_label}")

    response = {'prediction': predicted_label, 'action_scheduled': False}

    if predicted_label in WASTE_TO_COILS:
        response['action_scheduled'] = True
        response['delay'] = WASTE_TO_COILS[predicted_label]["delay"]
        thread = threading.Thread(target=delayed_action, args=(predicted_label,))
        thread.start()
    else:
        response['error'] = f'No hay configuración para la categoría: {predicted_label}'

    return jsonify(response)

@app.route('/activate_arm/<waste_type>')
def activate_arm_route(waste_type):
    if waste_type in WASTE_TO_COILS:
        arm_coil = WASTE_TO_COILS[waste_type]["arm"]
        if activate_arm(arm_coil, waste_type):
            return jsonify({"message": f"Brazo para {waste_type} activado"})
        else:
            return jsonify({"error": f"Error al activar el brazo para {waste_type}"}), 500
    else:
        return jsonify({"error": f"No hay configuración para el tipo de residuo: {waste_type}"}), 400

@app.route('/activate_belt/<waste_type>')
def activate_belt_route(waste_type):
    if waste_type in WASTE_TO_COILS:
        belt_coil = WASTE_TO_COILS[waste_type]["belt"]
        if activate_belt(belt_coil):
            return jsonify({"message": f"Banda para {waste_type} activada"})
        else:
            return jsonify({"error": f"Error al activar la banda para {waste_type}"}), 500
    else:
        return jsonify({"error": f"No hay configuración para el tipo de residuo: {waste_type}"}), 400

@app.route('/trigger_emitter')
def trigger_emitter_route():
    if trigger_emitter():
        return jsonify({"message": "Emisor activado"})
    else:
        return jsonify({"error": "Error al activar el emisor"}), 500

@app.route('/run_general_belts')
def run_general_belts():
    try:
        if not modbus_client.is_open:
            if not modbus_client.open():
                return jsonify({"error": f"Error al abrir conexión: {modbus_client.last_error()}"}), 500
        for i in range(4):
            if not modbus_client.write_single_coil(i, True):
                return jsonify({"error": f"Error al escribir al Coil {i}: {modbus_client.last_error()}"}), 500
        return jsonify({"message": "✅ Bandas generales corriendo"})
    except Exception as e:
        return jsonify({"error": f"Error: {str(e)}"}), 500
    finally:
        if modbus_client.is_open:
            modbus_client.close()

@app.route('/stop_general_belts')
def stop_general_belts():
    try:
        if not modbus_client.is_open:
            if not modbus_client.open():
                return jsonify({"error": f"Error al abrir conexión: {modbus_client.last_error()}"}), 500
        for i in range(4):
            if not modbus_client.write_single_coil(i, False):
                return jsonify({"error": f"Error al escribir al Coil {i}: {modbus_client.last_error()}"}), 500
        return jsonify({"message": "✅ Bandas generales detenidas"})
    except Exception as e:
        return jsonify({"error": f"Error: {str(e)}"}), 500
    finally:
        if modbus_client.is_open:
            modbus_client.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')

import os
import numpy as np
import json
import time
import base64
import threading
import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from pyModbusTCP.client import ModbusClient
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()
client = OpenAI()

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
    "battery":   {"arm": 5,  "belt": 4,  "delay": 0.9},
    "cardboard": {"arm": 7,  "belt": 6,  "delay": 2.8},
    "electronic":{"arm": 9,  "belt": 8,  "delay": 4.4},
    "glass":     {"arm": 11, "belt": 10, "delay": 6.2},
    "metal":     {"arm": 13, "belt": 12, "delay": 8.4},
    "organico":  {"arm": 15, "belt": 14, "delay": 9.6},
    "paper":     {"arm": 17, "belt": 16, "delay": 11.5},
    "plastic":   {"arm": 19, "belt": 18, "delay": 12.8},
    "tetrapak":  {"arm": 21, "belt": 20, "delay": 15},
    "trash":     {"arm": 23, "belt": 22, "delay": 16.4}
}
EMITTER_COIL = 24

def activate_belt(belt_coil):
    try:
        if not modbus_client.is_open and not modbus_client.open():
            return False
        if modbus_client.write_single_coil(belt_coil, True):
            time.sleep(0.5)
            modbus_client.write_single_coil(belt_coil, False)
            return True
        return False
    finally:
        if modbus_client.is_open:
            modbus_client.close()

def activate_arm(arm_coil, waste_type):
    try:
        if not modbus_client.is_open and not modbus_client.open():
            return False
        if waste_type not in ARM_STATUS or not ARM_STATUS[waste_type]:
            if modbus_client.write_single_coil(arm_coil, True):
                ARM_STATUS[waste_type] = True
                time.sleep(1)
                modbus_client.write_single_coil(arm_coil, False)
                ARM_STATUS[waste_type] = False
                return True
        return True
    finally:
        if modbus_client.is_open:
            modbus_client.close()

def trigger_emitter():
    try:
        if not modbus_client.is_open and not modbus_client.open():
            return False
        if modbus_client.write_single_coil(EMITTER_COIL, True):
            time.sleep(0.2)
            modbus_client.write_single_coil(EMITTER_COIL, False)
            return True
        return False
    finally:
        if modbus_client.is_open:
            modbus_client.close()

def delayed_action(waste_type):
    if waste_type in WASTE_TO_COILS:
        delay = WASTE_TO_COILS[waste_type]["delay"]
        arm_coil = WASTE_TO_COILS[waste_type]["arm"]
        belt_coil = WASTE_TO_COILS[waste_type]["belt"]

        trigger_emitter()
        time.sleep(delay)
        if activate_belt(belt_coil):
            activate_arm(arm_coil, waste_type)

@app.route('/')
def hello():
    return jsonify({"message": " Microservicio IA activo"})

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

    response = {'prediction': predicted_label, 'action_scheduled': False}
    if predicted_label in WASTE_TO_COILS:
        response['action_scheduled'] = True
        response['delay'] = WASTE_TO_COILS[predicted_label]["delay"]
        thread = threading.Thread(target=delayed_action, args=(predicted_label,))
        thread.start()
    else:
        response['error'] = f'No hay configuración para la categoría: {predicted_label}'

    return jsonify(response)

@app.route('/predict/gpt', methods=['POST'])
def predict_with_gpt4o_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No se encontró imagen'}), 400

    image = request.files['image']
    image_bytes = image.read()
    img_base64 = base64.b64encode(image_bytes).decode("utf-8")

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                        
                            "text": (
                                "Analiza esta imagen de basura y responde únicamente con una palabra, sin explicaciones ni variaciones.\n"
                                "La respuesta debe ser exactamente una de las siguientes (en minúsculas):\n"
                                "battery, cardboard, electronic, glass, metal, organic, paper, plastic, tetrapak, trash.\n"
                                "Concéntrate en el objeto principal de la imagen. Si hay dudas, elige la opción más similar visualmente.\n"
                                "Sé riguroso al distinguir entre materiales, figate en las texturas para poder diferenciar entre las categorias."
                            )
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{img_base64}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=100
        )

        result_text = response.choices[0].message.content.strip().lower()
        allowed_labels = set(WASTE_TO_COILS.keys())

        # Asegurar que sea una categoría válida
        if result_text not in allowed_labels:
            for label in allowed_labels:
                if label in result_text:
                    result_text = label
                    break
            else:
                result_text = "trash"

        # Activar actuadores si es válido
        if result_text in WASTE_TO_COILS:
            thread = threading.Thread(target=delayed_action, args=(result_text,))
            thread.start()

        return jsonify({"prediction": result_text})


    except Exception as e:
        print(" ERROR en /predict/gpt-image:", e)
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/activate_arm/<waste_type>')
def activate_arm_route(waste_type):
    if waste_type in WASTE_TO_COILS:
        if activate_arm(WASTE_TO_COILS[waste_type]["arm"], waste_type):
            return jsonify({"message": f"Brazo para {waste_type} activado"})
        return jsonify({"error": f"Error al activar el brazo para {waste_type}"}), 500
    return jsonify({"error": f"No hay configuración para el tipo de residuo: {waste_type}"}), 400

@app.route('/activate_belt/<waste_type>')
def activate_belt_route(waste_type):
    if waste_type in WASTE_TO_COILS:
        if activate_belt(WASTE_TO_COILS[waste_type]["belt"]):
            return jsonify({"message": f"Banda para {waste_type} activada"})
        return jsonify({"error": f"Error al activar la banda para {waste_type}"}), 500
    return jsonify({"error": f"No hay configuración para el tipo de residuo: {waste_type}"}), 400

@app.route('/trigger_emitter')
def trigger_emitter_route():
    if trigger_emitter():
        return jsonify({"message": "Emisor activado"})
    return jsonify({"error": "Error al activar el emisor"}), 500

@app.route('/run_general_belts')
def run_general_belts():
    try:
        if not modbus_client.is_open and not modbus_client.open():
            return jsonify({"error": f"Error al abrir conexión"}), 500
        for i in range(4):
            if not modbus_client.write_single_coil(i, True):
                return jsonify({"error": f"Error al escribir al Coil {i}"}), 500
        return jsonify({"message": "Bandas generales corriendo"})
    finally:
        if modbus_client.is_open:
            modbus_client.close()

@app.route('/stop_general_belts')
def stop_general_belts():
    try:
        if not modbus_client.is_open and not modbus_client.open():
            return jsonify({"error": f"Error al abrir conexión"}), 500
        for i in range(4):
            if not modbus_client.write_single_coil(i, False):
                return jsonify({"error": f"Error al escribir al Coil {i}"}), 500
        return jsonify({"message": "Bandas generales detenidas"})
    finally:
        if modbus_client.is_open:
            modbus_client.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')

import os
import numpy as np
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

app = Flask(__name__)
CORS(app)

# Configuración
UPLOAD_FOLDER = 'static/uploads'
MODEL_PATH = 'predictions/modelo_residuos.h5'
LABELS_PATH = 'predictions/labels.json'
IMG_SIZE = 150

# Crear carpeta de uploads si no existe
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Cargar modelo y etiquetas
model = load_model(MODEL_PATH)
with open(LABELS_PATH, 'r') as f:
    labels = json.load(f)
idx_to_class = {int(v): k for k, v in labels.items()}

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

    # Procesar imagen
    img = load_img(image_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    class_index = int(np.argmax(prediction))
    predicted_label = idx_to_class[class_index]

    return jsonify({'prediction': predicted_label})

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')

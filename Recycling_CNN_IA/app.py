import os
import numpy as np
from flask import Flask, request, render_template
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img

# Rutas
MODEL_PATH = "modelo_residuos.h5"
LABELS_PATH = "labels.npy"
UPLOAD_FOLDER = "static/uploads"

# Inicializar Flask
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Cargar modelo entrenado y clases
model = load_model(MODEL_PATH)
class_indices = np.load(LABELS_PATH, allow_pickle=True).item()
# Invertir el dict para obtener índice → nombre de clase
idx_to_class = {v: k for k, v in class_indices.items()}

IMG_SIZE = 150  # Debe coincidir con el tamaño que usaste al entrenar

# Página principal
@app.route('/')
def index():
    return render_template('index.html')

# Procesar imagen
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return "❌ No se subió ninguna imagen"

    file = request.files['image']
    if file.filename == '':
        return "❌ Archivo vacío"

    if file:
        # Guardar imagen
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(image_path)

        # Preprocesar imagen
        img = load_img(image_path, target_size=(IMG_SIZE, IMG_SIZE))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predecir
        prediction = model.predict(img_array)
        class_index = np.argmax(prediction)
        predicted_label = idx_to_class[class_index]

        return render_template('index.html', prediction=predicted_label, image_path=image_path)

# Ejecutar app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

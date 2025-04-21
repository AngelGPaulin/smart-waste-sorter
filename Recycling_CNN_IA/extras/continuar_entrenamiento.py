import os
import numpy as np
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
from keras.callbacks import ModelCheckpoint, EarlyStopping
import matplotlib.pyplot as plt
from PIL import ImageFile

# ✅ Cargar imágenes incluso si están truncadas
ImageFile.LOAD_TRUNCATED_IMAGES = True

# 📁 Rutas
DATASET_DIR = "/app/Imagenes_IA"
MODEL_PATH = "/app/modelo_residuos.h5"

# 🧠 Parámetros del modelo
IMG_SIZE = 150
BATCH_SIZE = 32

# 🔄 Cargar modelo guardado
print("🔄 Cargando modelo existente...")
model = load_model(MODEL_PATH)

# 🔧 Aumento de datos + validación
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=25,
    zoom_range=0.3,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    validation_split=0.2
)

# 📦 Generadores
train_generator = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

val_generator = train_datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

# 💾 Callbacks combinados
checkpoint = ModelCheckpoint(
    MODEL_PATH,
    monitor='val_accuracy',
    save_best_only=True,
    verbose=1
)

early_stop = EarlyStopping(
    monitor='val_accuracy',
    patience=5,
    restore_best_weights=True
)

# 🏋️ Entrenamiento
EPOCHS_EXTRA = 100
print(f"🏋️ Continuando entrenamiento por hasta {EPOCHS_EXTRA} épocas más...")
history = model.fit(
    train_generator,
    epochs=EPOCHS_EXTRA,
    validation_data=val_generator,
    callbacks=[checkpoint, early_stop]
)

# 📊 Graficar resultados
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history["accuracy"], label="Entrenamiento")
plt.plot(history.history["val_accuracy"], label="Validación")
plt.title("Precisión (continuado)")
plt.xlabel("Épocas")
plt.ylabel("Accuracy")
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history["loss"], label="Entrenamiento")
plt.plot(history.history["val_loss"], label="Validación")
plt.title("Pérdida (continuado)")
plt.xlabel("Épocas")
plt.ylabel("Loss")
plt.legend()

plt.tight_layout()
plt.savefig("/app/training_plot_continuado.png")
plt.show()

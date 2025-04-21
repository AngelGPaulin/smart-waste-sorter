import os
from PIL import Image, UnidentifiedImageError

# 📁 Ruta de tu dataset
DATASET_DIR = "D:/Imagenes_IA"
print("📁 Verificando ruta:", DATASET_DIR)
print("📂 Carpetas encontradas:", os.listdir(DATASET_DIR))

total = 0
eliminadas = 0

print("🔍 Escaneando imágenes en busca de errores...")

for root, dirs, files in os.walk(DATASET_DIR):
    for file in files:
        if file.lower().endswith((".jpg", ".jpeg", ".png")):
            total += 1
            file_path = os.path.join(root, file)
            try:
                with Image.open(file_path) as img:
                    img.verify()  # Revisa que sea válida
            except (IOError, SyntaxError, UnidentifiedImageError):
                eliminadas += 1
                print(f"🗑️ Imagen corrupta eliminada: {file_path}")
                os.remove(file_path)

print(f"\n✅ Limpieza completa: {eliminadas} imágenes corruptas eliminadas de {total} totales.")

import os

# Ruta base donde están las carpetas como "plastic", "glass", "organico", etc.
base_dir = r"D:\Imagenes_IA"

# Recorre cada carpeta dentro de la ruta base
for folder_name in os.listdir(base_dir):
    folder_path = os.path.join(base_dir, folder_name)

    if os.path.isdir(folder_path):
        print(f"🔄 Procesando carpeta: {folder_name}")
        idx = 0  # índice reiniciado para cada clase

        for file_name in os.listdir(folder_path):
            file_path = os.path.join(folder_path, file_name)

            if os.path.isfile(file_path):
                ext = os.path.splitext(file_name)[1]
                new_name = f"{folder_name}_{idx}{ext}"
                new_path = os.path.join(folder_path, new_name)

                # Evita sobrescribir archivos
                while os.path.exists(new_path):
                    idx += 1
                    new_name = f"{folder_name}_{idx}{ext}"
                    new_path = os.path.join(folder_path, new_name)

                os.rename(file_path, new_path)
                idx += 1

print("✅ Todas las imágenes han sido renombradas correctamente.")

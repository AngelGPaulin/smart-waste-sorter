import os
import shutil

# Ruta base (modifica si cambia)
base_dir = r"D:\Imagenes_IA\organico"

# Recorremos todas las subcarpetas dentro de 'organico'
for folder_name in os.listdir(base_dir):
    folder_path = os.path.join(base_dir, folder_name)
    
    if os.path.isdir(folder_path):
        print(f"📂 Procesando carpeta: {folder_name}")

        for idx, file_name in enumerate(os.listdir(folder_path)):
            file_path = os.path.join(folder_path, file_name)
            
            if os.path.isfile(file_path):
                ext = os.path.splitext(file_name)[1]
                new_name = f"{folder_name}_{idx}{ext}"  # Evita conflictos con nombres duplicados
                new_path = os.path.join(base_dir, new_name)
                
                shutil.move(file_path, new_path)

        # Borra la carpeta vacía al final
        os.rmdir(folder_path)

print("✅ Todas las imágenes fueron movidas y renombradas en la carpeta 'organico'.")

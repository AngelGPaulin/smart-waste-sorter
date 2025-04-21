# Imagen base con Python
FROM python:3.10-slim

# Actualizar la lista de paquetes
RUN apt-get update

# Instalar dependencias comunes para aplicaciones que interactúan con gráficos (OpenCV, Matplotlib, etc.)
RUN apt-get install -y \
    build-essential \
    libglib2.0-0 \
    libgtk-3-0 \
    libsm6 \
    libxrender1 \
    libxext6 \
    libgl1-mesa-glx

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto al contenedor
COPY . /app

# Instalar dependencias de Python
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Exponer el puerto (si es una aplicación web)
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]
from pyModbusTCP.client import ModbusClient
import logging

logging.basicConfig(level=logging.DEBUG)

client = ModbusClient(host='172.29.48.1', port=502)

logging.info("Intentando abrir la conexión Modbus...")
if not client.open():
    logging.error(f"Error al abrir la conexión: {client.last_error()}")
else:
    logging.info("Conexión Modbus abierta exitosamente.")
    client.close()
    logging.info("Conexión Modbus cerrada.")
import 'package:flutter/material.dart';

class MapPage extends StatelessWidget {
  const MapPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              // Usamos un Row para alinear la imagen a la izquierda
              Row(
                children: [
                  SizedBox(
                    width: 60, // Ancho deseado
                    height: 60, // Alto deseado
                    child: Image.asset("assets/images/Logo.jpg"),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              // El TextButton y el Text se mantienen centrados
              Image.asset("assets/images/mapa-queretaro.jpg"),
              Center(
                child: TextButton(
                  onPressed: () {},
                  child: Text(
                    "Ubicaciones cerca de ti",
                    style: TextStyle(color: Color(0xFF87be87)),
                  ),
                ),
              ),
              const SizedBox(height: 10),
              // Este texto también se mantiene centrado
              const Text(
                "Puedes revisar las Condiciones de servicio de Mushrooms y reconoces que leíste nuestra Política de privacidad.",
                style: TextStyle(fontSize: 10),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

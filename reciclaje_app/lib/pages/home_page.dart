import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  void _logout(BuildContext context) {
    // Aquí puedes agregar lógica adicional, como eliminar un token de autenticación
    // Por ejemplo:
    // await SecureStorage.deleteToken();

    // Redirige al usuario a la página de inicio de sesión y limpia el historial de navegación
    Navigator.pushNamedAndRemoveUntil(context, 'login_page', (route) => false);
  }

  @override
  Widget build(BuildContext context) {
    // Ejemplo de progreso (67%)
    double progress = 0.67;

    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  TextButton(
                    onPressed: () => _logout(context),
                    child: const Text(
                      "Cerrar sesión",
                      style: TextStyle(
                        color: Color(0xFF379237),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(width: 200),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: const [
                      Text(
                        "Perfil",
                        style: TextStyle(
                          color: Color(0xFF379237),
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text("Joelito", style: TextStyle(fontSize: 14)),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 20),
              Container(
                width: double.infinity,
                height: 320,
                decoration: BoxDecoration(
                  color: const Color(0xFFe6eff9),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "Puntos",
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                      ),
                      const SizedBox(height: 20),
                      Center(
                        child: Stack(
                          alignment: Alignment.center,
                          children: [
                            SizedBox(
                              width: 200,
                              height: 200,
                              child: CircularProgressIndicator(
                                strokeWidth: 10,
                                value:
                                    progress, // Progreso basado en porcentaje (0.0 a 1.0)
                                valueColor: const AlwaysStoppedAnimation<Color>(
                                  Color(0xFF379237),
                                ),
                                backgroundColor:
                                    Colors.red, // Color de fondo del indicador
                              ),
                            ),
                            const Text(
                              "127", // Convierte el progreso a porcentaje
                              style: TextStyle(
                                fontSize: 100,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),
                      const Center(child: Text("Proxima recompensa")),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 30),
              const NavigationButton(
                label: "Mapa",
                icon: Icons.map,
                route: 'map_page',
              ),
              const SizedBox(height: 50),
              const NavigationButton(
                label: "Obtener puntos",
                icon: Icons.smartphone,
                route: 'image_page',
              ),
              const SizedBox(height: 50),
              const NavigationButton(
                label: "Escanear",
                icon: Icons.qr_code,
                route: 'home_page',
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class NavigationButton extends StatelessWidget {
  const NavigationButton({
    super.key,
    required this.label,
    required this.icon,
    required this.route,
  });
  final String label;
  final IconData icon;
  final String route;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton(
        onPressed: () {
          Navigator.pushNamed(context, route);
        },
        style: OutlinedButton.styleFrom(
          backgroundColor: const Color(0xFFdbebdb),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          side: BorderSide.none, // Quita la línea del botón
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: const TextStyle(color: Colors.black, fontSize: 20),
              textAlign: TextAlign.start,
            ),
            Icon(icon, color: Colors.black, size: 30),
          ],
        ),
      ),
    );
  }
}

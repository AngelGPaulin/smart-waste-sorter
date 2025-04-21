import 'package:flutter/material.dart';
import 'package:reciclaje_app/pages/widgets/common_widgets.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void _login() {
    final email = emailController.text;
    final password = passwordController.text;

    if (email.isNotEmpty && password.isNotEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Inicio de sesión simulado para $email')),
      );
      Navigator.pushNamed(context, 'home_page');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Por favor, complete todos los campos.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor: Colors.black, toolbarHeight: 25),
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 22),
            child: Column(
              children: [
                Image.asset("assets/images/Logo.jpg", width: 200),
                const SizedBox(height: 10),
                const Text(
                  "Bienvenido",
                  textAlign: TextAlign.center,
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 40),
                ),
                const SizedBox(height: 20),
                CustomTextField(
                  label: "Correo electrónico",
                  icon: const Icon(Icons.mail),
                  controller: emailController,
                ),
                const SizedBox(height: 10),
                CustomTextField(
                  label: "Contraseña",
                  icon: const Icon(Icons.lock),
                  controller: passwordController,
                  obscureText: true,
                ),
                TextButton(
                  onPressed: () {},
                  child: const Text(
                    "¿Olvidaste tu contraseña?",
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton(
                    onPressed: _login,
                    style: OutlinedButton.styleFrom(
                      backgroundColor: const Color(0xFF87be87),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      side: BorderSide.none,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 20,
                        vertical: 10,
                      ),
                    ),
                    child: Text(
                      "Iniciar sesión",
                      style: const TextStyle(fontSize: 15, color: Colors.black),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                CustomButton(
                  text: "Registrarse",
                  color: const Color(0xFFb3cfed),
                  route: 'register_page',
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

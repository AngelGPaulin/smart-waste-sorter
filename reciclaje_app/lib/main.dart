import 'package:flutter/material.dart';
import 'package:reciclaje_app/pages/home_page.dart';
import 'package:reciclaje_app/pages/image_page.dart';
import 'package:reciclaje_app/pages/login_page.dart';
import 'package:reciclaje_app/pages/map_page.dart';
import 'package:reciclaje_app/pages/register_page.dart';

class AppRoutes {
  static const String homePage = 'home_page';
  static const String loginPage = 'login_page';
  static const String registerPage = 'register_page';
  static const String mapPage = 'map_page';
  static const String imagePage = 'image_page';
}

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  bool _checkIfLoggedIn() {
    // Simulación del estado de inicio de sesión
    return false; // Cambiar a true si deseas iniciar sesión automáticamente
  }

  @override
  Widget build(BuildContext context) {
    final bool isLoggedIn = _checkIfLoggedIn();
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: isLoggedIn ? const HomePage() : const LoginPage(),
      routes: {
        AppRoutes.registerPage: (context) => const RegisterPage(),
        AppRoutes.loginPage: (context) => const LoginPage(),
        AppRoutes.homePage: (context) => const HomePage(),
        AppRoutes.mapPage: (context) => const MapPage(),
        AppRoutes.imagePage: (context) => const ImagePage(),
      },
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.white,
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.black,
          toolbarHeight: 20,
        ),
      ),
    );
  }
}

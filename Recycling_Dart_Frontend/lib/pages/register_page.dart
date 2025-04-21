import 'package:flutter/material.dart';
import 'package:reciclaje_app/pages/widgets/common_widgets.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final List<String> municipios = [
    'Amealco de Bonfil',
    'Arroyo Seco',
    'Cadereyta de Montes',
    'Colón',
    'Corregidora',
    'El Marqués',
    'Ezequiel Montes',
    'Huimilpan',
    'Jalpan de Serra',
    'Landa de Matamoros',
    'Pedro Escobedo',
    'Peñamiller',
    'Pinal de Amoles',
    'Querétaro',
    'San Joaquín',
    'San Juan del Río',
    'Tequisquiapan',
    'Tolimán',
  ];
  String? municipioSeleccionado;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 22),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset("assets/images/Logo.jpg", width: 200),
                const SizedBox(height: 10),
                const Text(
                  "Registro de nuevos usuarios",
                  textAlign: TextAlign.center,
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
                ),
                const SizedBox(height: 20),
                const Text("¡Es muy fácil y rápido!"),
                const SizedBox(height: 30),
                CustomTextField(
                  label: "Nombre de usuario",
                  icon: Icon(Icons.person),
                ),
                const SizedBox(height: 10),
                CustomTextField(
                  label: "Correo electrónico",
                  icon: Icon(Icons.mail),
                ),
                const SizedBox(height: 10),
                DropdownButtonFormField<String>(
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Color(0xFFe2e2e2),
                    prefixIcon: Icon(Icons.flag),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide.none,
                    ),
                    label: Text(
                      "Municipio",
                      style: TextStyle(fontStyle: FontStyle.italic),
                    ),
                  ),
                  value: municipioSeleccionado,
                  items:
                      municipios
                          .map(
                            (municipio) => DropdownMenuItem(
                              value: municipio,
                              child: Text(
                                municipio,
                                style: TextStyle(fontWeight: FontWeight.normal),
                              ),
                            ),
                          )
                          .toList(),
                  onChanged: (valor) {
                    setState(() {
                      municipioSeleccionado = valor;
                    });
                  },
                ),
                const SizedBox(height: 10),
                CustomTextField(label: "Contraseña", icon: Icon(Icons.lock)),
                const SizedBox(height: 10),
                CustomTextField(
                  label: "Confirmar contraseña",
                  icon: Icon(Icons.lock),
                ),
                const SizedBox(height: 30),
                CustomButton(
                  text: 'Crear cuenta nueva',
                  color: Color(0xff87be87),
                  route: '',
                ),
                const SizedBox(height: 30),
                Text(
                  "Al registrarte, aceptas las Condiciones de servicio de Mushrooms y reconoces que leíste nuestra Política de privacidad.",
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

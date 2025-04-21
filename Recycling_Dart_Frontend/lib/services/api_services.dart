import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = "http://192.168.25.222:4000";

  // Método para solicitudes GET
  Future<dynamic> getData(String endpoint) async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/$endpoint'));

      if (response.statusCode == 200) {
        return jsonDecode(response.body); // Decodifica el JSON
      } else {
        throw Exception('Error en la petición: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error al conectar con la API: $e');
    }
  }

  // Método para solicitudes POST
  Future<dynamic> postData(String endpoint, Map<String, dynamic> data) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/$endpoint'),
        headers: {
          'Content-Type':
              'application/json', // Asegura que el backend reciba JSON
        },
        body: jsonEncode(data), // Convierte el mapa a JSON
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        return jsonDecode(response.body); // Decodifica el JSON
      } else {
        throw Exception('Error en la petición: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error al conectar con la API: $e');
    }
  }
}

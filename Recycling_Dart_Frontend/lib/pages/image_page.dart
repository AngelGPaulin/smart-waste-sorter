import 'package:flutter/material.dart';
import 'package:reciclaje_app/pages/widgets/common_widgets.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

class ImagePage extends StatefulWidget {
  const ImagePage({Key? key}) : super(key: key);

  @override
  _ImagePageState createState() => _ImagePageState();
}

class _ImagePageState extends State<ImagePage> {
  File? _selectedImage;
  final ImagePicker _picker = ImagePicker();

  Future<void> _pickImage() async {
    // Abrir la galería para seleccionar una imagen
    final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
    if (image != null) {
      setState(() {
        _selectedImage = File(image.path);
      });
    }
  }

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
              // Encabezado con logo y título
              Row(
                children: [
                  SizedBox(
                    width: 60,
                    height: 60,
                    child: Image.asset("assets/images/Logo.jpg"),
                  ),
                  const SizedBox(width: 60),
                  Text(
                    "Subir una imagen",
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25),
                  ),
                ],
              ),
              const SizedBox(height: 15),
              Center(
                child: GestureDetector(
                  onTap: _pickImage,
                  child: Container(
                    width: double.infinity,
                    height: 500,
                    decoration: BoxDecoration(
                      color: Colors.grey[300],
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: Colors.grey, width: 0),
                    ),
                    child:
                        _selectedImage != null
                            ? Image.file(_selectedImage!, fit: BoxFit.cover)
                            : const Icon(
                              Icons.add_a_photo,
                              color: Colors.grey,
                              size: 50,
                            ),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              CustomButton(
                text: "Identificar elementos",
                color: Color(0xFF87be87),
              ),
              const SizedBox(height: 10),
              CustomButton(text: "Escanear puntos", color: Color(0xFFb3cfed)),
            ],
          ),
        ),
      ),
    );
  }
}

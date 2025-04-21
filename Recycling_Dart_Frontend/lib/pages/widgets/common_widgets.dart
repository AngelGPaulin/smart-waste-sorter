import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  const CustomTextField({
    super.key,
    required this.label,
    required this.icon,
    this.controller,
    this.obscureText = false,
  });

  final String label;
  final Icon icon;
  final TextEditingController? controller;
  final bool obscureText;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      decoration: InputDecoration(
        prefixIcon: icon,
        filled: true,
        fillColor: const Color(0xFFe2e2e2),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide.none,
        ),
        label: Text(label, style: const TextStyle(fontStyle: FontStyle.italic)),
      ),
    );
  }
}

class CustomButton extends StatelessWidget {
  const CustomButton({
    super.key,
    required this.text,
    required this.color,
    this.route,
  });

  final String text;
  final Color color;
  final String? route;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton(
        onPressed:
            route != null
                ? () {
                  Navigator.pushNamed(context, route!);
                }
                : null,
        style: OutlinedButton.styleFrom(
          backgroundColor: color,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          side: BorderSide.none,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        ),
        child: Text(
          text,
          style: const TextStyle(fontSize: 15, color: Colors.black),
        ),
      ),
    );
  }
}

class CustomFetchButton extends StatelessWidget {
  const CustomFetchButton({
    super.key,
    required this.text,
    required this.color,
    required this.onPressed,
  });

  final String text;
  final Color color;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          backgroundColor: color,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          side: BorderSide.none,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        ),
        child: Text(
          text,
          style: const TextStyle(
            fontSize: 15,
            color: Colors.black,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}

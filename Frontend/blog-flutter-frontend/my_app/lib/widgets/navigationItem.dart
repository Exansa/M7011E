import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/pages/home.dart';

class NavigationItem extends StatelessWidget {
  final String title;
  final String route;

  const NavigationItem({Key key, @required this.title, this.route})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        if (route == "/home") {
          Get.to(Home());
        } else {
          Get.toNamed(route);
        }
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 50.0),
        child: Text(
          title,
          style: const TextStyle(fontSize: 20.0, color: Colors.white),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/pages/browse.dart';

class Home extends StatelessWidget {
  const Home({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ElevatedButton(
              onPressed: () {
                Get.to(Browse());
              },
              child: const Text("Open other screen"))
        ],
      ),
    );
  }
}

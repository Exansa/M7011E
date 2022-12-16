import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Browse extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ElevatedButton(
              onPressed: () {
                Get.back();
              },
              child: Text("Open other screen"))
        ],
      ),
    );
  }
}

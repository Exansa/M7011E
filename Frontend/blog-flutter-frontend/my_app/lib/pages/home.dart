import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/pages/browse.dart';

class Home extends StatelessWidget {
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
              child: Text("Open other screen")),
          const Card(),
        ],
        /*Card(), Card(), Card()*/
      ),
    );
  }
}

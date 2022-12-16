import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'navigationItem.dart';

class NavigationBarWeb extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100.0,
      child: Row(
        mainAxisSize: MainAxisSize.max,
        children: [
          NavigationItem(title: 'Home'),
          NavigationItem(title: 'About'),
          NavigationItem(title: 'Browse'),
        ],
      ),
    );
  }
}

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
          NavigationItem(title: 'Home', route: '/home'),
          NavigationItem(title: 'About', route: '/about'),
          NavigationItem(title: 'Browse', route: '/browse'),
        ],
      ),
    );
  }
}

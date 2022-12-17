import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'navigationItem.dart';

//navbar guide
//https://dariadobszai.medium.com/interactive-navigation-items-in-flutter-web-7fccc5975779
class NavigationBarWeb extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100.0,
      color: Colors.blue,
      child: Row(
        mainAxisSize: MainAxisSize.max,
        children: const [
          NavigationItem(title: 'Home', route: '/home'),
          NavigationItem(title: 'About', route: '/about'),
          NavigationItem(title: 'Browse', route: '/browse'),
        ],
      ),
    );
  }
}

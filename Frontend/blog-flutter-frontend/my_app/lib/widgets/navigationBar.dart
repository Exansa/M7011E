import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'navigationItem.dart';

class NavigationBarWeb extends StatelessWidget {
  const NavigationBarWeb({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100.0,
      color: Get.theme.primaryColor,
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

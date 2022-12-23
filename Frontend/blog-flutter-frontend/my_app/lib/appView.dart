import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'widgets/navigationBar.dart';

class AppView extends StatelessWidget {
  final Widget child;

  const AppView({Key key, @required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Column(
        children: [NavigationBarWeb(), Expanded(child: child)],
      ),
    );
  }
}

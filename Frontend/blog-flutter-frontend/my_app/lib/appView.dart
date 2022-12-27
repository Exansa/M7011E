import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:my_app/widgets/navigationItem.dart';
import 'widgets/navigationBar.dart';

class AppView extends StatelessWidget {
  final Widget child;

  AppView({Key key, @required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;

    return Scaffold(
      appBar: PreferredSize(
          preferredSize: Size(screenSize.width, 1000),
          child: NavigationBarWeb()),
      backgroundColor: Colors.white,
      body: Column(
        children: [Expanded(child: child)],
      ),
    );
  }
}

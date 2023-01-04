import 'package:auth0_flutter2/auth0_flutter2.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/pages/home.dart';
import 'package:my_app/resource/google_signin_api.dart';

class NavigationItem extends StatefulWidget {
  final String title;
  final String route;
  final double textSize;

  const NavigationItem(
      {Key key, @required this.title, this.route, this.textSize})
      : super(key: key);

  @override
  State<StatefulWidget> createState() =>
      NavigationItemState(this.title, this.route, this.textSize);
}

class NavigationItemState extends State<NavigationItem> {
  final String title;
  final String route;
  final double textSize;
  var hovering = false;

  NavigationItemState(this.title, this.route, this.textSize);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onHover: (value) => setState(() {
        hovering = value;
      }),
      onTap: () {
        //Get.toNamed(route);
        if (route != "/login" && route != "/logout") {
          Get.toNamed(route);
        } else if (route == "/login") {
          print("Login pressed");
          Auth0Flutter2.instance.loginUser().then((value) => print(value));
        } else {
          Auth0Flutter2.instance.logoutUser();
        }
      },
      child: Text(
        title,
        style: TextStyle(
            fontSize: textSize, color: hovering ? Colors.white : Colors.black),
      ),
    );
  }
}

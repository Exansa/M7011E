import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/pages/home.dart';

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
        Get.toNamed(route);
      },
      child: Text(
        title,
        style: TextStyle(
            fontSize: textSize, color: hovering ? Colors.white : Colors.black),
      ),
    );
  }
}

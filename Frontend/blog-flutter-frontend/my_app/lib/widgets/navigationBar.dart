import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'navigationItem.dart';

//navbar guide
//https://dariadobszai.medium.com/interactive-navigation-items-in-flutter-web-7fccc5975779
class NavigationBarWeb extends StatelessWidget {
  const NavigationBarWeb({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;

    return Container(
      height: 100.0,
      color: Get.theme.primaryColor,
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Row(
          mainAxisSize: MainAxisSize.max,
          children: [
            const Text("M7011E: Blog"),
            Expanded(
              child:
                  Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                const NavigationItem(
                  title: 'Home',
                  route: '/home',
                  textSize: 20.0,
                ),
                SizedBox(width: screenSize.width / 30),
                const NavigationItem(
                  title: 'About',
                  route: '/about',
                  textSize: 20.0,
                ),
                SizedBox(width: screenSize.width / 30),
                const NavigationItem(
                  title: 'Browse',
                  route: '/browse',
                  textSize: 20.0,
                ),
              ]),
            ),
            const NavigationItem(title: "Sign up", route: "", textSize: 15.0),
            SizedBox(
              width: screenSize.width / 100,
            ),
            const NavigationItem(title: "Login", route: "", textSize: 15.0),
          ],
        ),
      ),
    );
  }
}

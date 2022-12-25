import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'navigationItem.dart';

class NavigationBarWeb extends StatelessWidget {
  const NavigationBarWeb({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;

    return PreferredSize(
        preferredSize: Size(screenSize.width, 1000),
        child: Container(
            height: 100.0,
            color: Get.theme.primaryColor,
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Row(
                mainAxisSize: MainAxisSize.max,
                children: [
                  const Text("M7011E: Blog"),
                  Expanded(
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const NavigationItem(title: 'Home', route: '/home'),
                          SizedBox(width: screenSize.width / 30),
                          const NavigationItem(title: 'About', route: '/about'),
                          SizedBox(width: screenSize.width / 30),
                          const NavigationItem(
                              title: 'Browse', route: '/browse'),
                        ]),
                  ),
                  InkWell(
                    onTap: () {},
                    child: Text(
                      'Sign Up',
                      style: TextStyle(color: Colors.black),
                    ),
                  ),
                  SizedBox(
                    width: screenSize.width / 50,
                  ),
                  InkWell(
                    onTap: () {},
                    child: Text(
                      'Login',
                      style: TextStyle(color: Colors.black),
                    ),
                  ),
                ],
              ),
            )));
  }
}

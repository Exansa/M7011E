import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:my_app/resource/google_signin_api.dart';
import 'navigationItem.dart';

class NavigationBarWeb extends StatefulWidget {
  const NavigationBarWeb({Key key}) : super(key: key);

  @override
  NavigationBarWebState createState() => NavigationBarWebState();
}

class NavigationBarWebState extends State<NavigationBarWeb> {
  GoogleSignInAccount account;

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;

    // GoogleSignInApi.getAccount().then(
    //   (value) => setState(() {
    //     account = value;
    //   }),
    // );

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
            // account != null
            //     ? Column(children: [
            //         Text("Hello, ${account.displayName}"),
            //         const NavigationItem(
            //             title: "Logout", route: "/logout", textSize: 15.0)
            //       ])
            //     :
            Row(children: [
              const NavigationItem(
                  title: "Sign up", route: "/signup", textSize: 15.0),
              SizedBox(
                width: screenSize.width / 100,
              ),
              const NavigationItem(
                  title: "Login", route: "/login", textSize: 15.0),
            ]),
          ],
        ),
      ),
    );
  }
}

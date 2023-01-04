import 'package:auth0_flutter2/auth0_flutter2.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/appView.dart';
import 'package:my_app/pages/home.dart';
import 'package:my_app/routing/routes.dart';

void main() {
  Auth0Flutter2.auth0Domain = "peterpanduro.eu.auth0.com";
  Auth0Flutter2.auth0ClientId = "nNei1uMJNluLsmy6BWvo4eTaaTHnczB9";
  Auth0Flutter2.redirectUri = "http://localhost:3000";

  // Set the URL strategy for our web app. Removes
  // trailing hash(#) to ensure login callbacks
  // will be captured and processed correctly.
  Auth0Flutter2.setPathUrlStrategy();

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter blog',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      builder: (_, child) => AppView(
        child: child,
      ),
      initialRoute: '/home',
      getPages: appRoutes(),
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key key}) : super(key: key);

  @override
  HomePageState createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  @override
  void initState() {
    checkForRedirectCallback();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container();
  }

  Future<void> checkForRedirectCallback() async {
    // Check for login callback state.
    var redirectCallbackHandled =
        await Auth0Flutter2.instance.handleWebLoginCallback(
      Uri.base.toString(),
    );

    // If callback was able to be processed, do something.
    if (redirectCallbackHandled) {
      // DO SOMETHING...
    }
  }
}

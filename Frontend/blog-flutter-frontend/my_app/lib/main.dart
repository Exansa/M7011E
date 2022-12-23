import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/appView.dart';
import 'package:my_app/pages/home.dart';
import 'package:my_app/routing/routes.dart';

void main() {
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
      //home: Home(),
    );
  }
}

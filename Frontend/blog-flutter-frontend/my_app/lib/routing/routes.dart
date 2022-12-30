import 'dart:html';

import 'package:get/get.dart';
import 'package:my_app/pages/about.dart';
import 'package:my_app/pages/home.dart';
import 'package:my_app/pages/browse.dart';
import 'package:my_app/pages/user/login.dart';
import 'package:my_app/pages/user/signup.dart';

//guide used was:
//https://padymies.medium.com/flutter-getx-route-managment-b47635abd832
appRoutes() => [
      GetPage(
        name: '/home',
        page: () => Home(),
        transition: Transition.leftToRightWithFade,
        transitionDuration: const Duration(milliseconds: 500),
      ),
      GetPage(
        name: '/about',
        page: () => About(),
        middlewares: [MyMiddelware()],
        transition: Transition.leftToRightWithFade,
        transitionDuration: const Duration(milliseconds: 500),
      ),
      GetPage(
        name: '/browse',
        page: () => Browse(),
        middlewares: [MyMiddelware()],
        transition: Transition.leftToRightWithFade,
        transitionDuration: const Duration(milliseconds: 500),
      ),
      GetPage(
        name: '/login',
        page: () => Login(),
        middlewares: [MyMiddelware()],
        transition: Transition.leftToRightWithFade,
        transitionDuration: const Duration(milliseconds: 500),
      ),
      GetPage(
        name: '/signup',
        page: () => SignUp(),
        middlewares: [MyMiddelware()],
        transition: Transition.leftToRightWithFade,
        transitionDuration: const Duration(milliseconds: 500),
      )
    ];

class MyMiddelware extends GetMiddleware {
  @override
  GetPage onPageCalled(GetPage page) {
    print(page?.name);
    return super.onPageCalled(page);
  }
}

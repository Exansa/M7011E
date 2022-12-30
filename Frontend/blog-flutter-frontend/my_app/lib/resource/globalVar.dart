import 'package:my_app/resource/google_signin_api.dart';

class Globals {
  static final Map CARD_DIMENSIONS = {
    "width": 500.0,
    "height": 400.0,
  };

  static final Map REGEXP = {
    // Standardized regex checking for valid email adresses
    // Src: https://html.spec.whatwg.org/multipage/input.html#e-mail-state-%28type=email%29
    "email": RegExp(
        r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'),
    "username": RegExp(r'^[A-Za-z][A-Za-z0-9_]{3,29}$'),
    "password": RegExp(r'^.{1,50}$'),
  };

  static bool SIGNED_IN = false;

  static String USER_ID = null;
}

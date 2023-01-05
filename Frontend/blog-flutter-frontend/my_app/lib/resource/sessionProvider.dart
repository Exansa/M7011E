import 'dart:convert';
import 'dart:io';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:html' as html;

class SessionProvider {
  static const apiAddress = "localhost";
  static const apiPort = "5000";
  static const apiURL = "http://$apiAddress:$apiPort";

  static Future<Map<String, dynamic>> login(Map request) async {
    // final uri = Uri.parse("$apiURL/");
    // var params = {"responseType": "token", "redirectUri": "/", "state": "adad"};

    // final redirect = client.authorizeUrl(params);
    // HttpClient().getUrl(Uri.parse(redirect)).then((request) => {
    //       //TODO: Handle request and grab token
    //     });

    // //TODO:. Put token into prefs
    // SharedPreferences prefs = await SharedPreferences.getInstance();

    // //TODO: Get user info and return it
    // //return response;
  }

  static Future<Map<String, dynamic>> signup(
      Map<String, String> request) async {
    // var params = {
    //   "username": request["username"],
    //   "password": request["password"],
    //   "email": request["email"],
    //   "connection": "" //TODO: Add connection
    // };

    // client.createUser(params, isEmail: true);

    // //TODO: Initiate login session of newly created user

    // //return;
  }

  static void logout() async {
    // client.logout();
    // var session = await SharedPreferences.getInstance();
    // await session.clear();
    // //TODO: Reload page
  }

  static Future<Map<String, dynamic>> postRequest(
      String url, Map<String, String> params) async {
    //Setup URI
    var httpClient = HttpClient();
    var uri = Uri.parse(url);

    //Setup request
    var request = await httpClient.postUrl(uri);

    //Make request
    request.headers.set('accept', 'application/json');
    request.headers.set('content-type', 'application/x-www-form-urlencoded');
    request.add(utf8.encode(json.encode(request)));

    //Get response
    var response = await request.close();
    var responseBody = await response.transform(utf8.decoder).join();

    return json.decode(responseBody);
  }
}

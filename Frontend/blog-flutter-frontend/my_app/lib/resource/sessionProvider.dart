import 'dart:convert';
import 'dart:io';

class SessionProvider {
  static const apiAddress = "localhost";
  static const apiPort = "5000";
  static const apiURL = "http://$apiAddress:$apiPort";

  static Future<Map<String, dynamic>> login(Map request) async {
    var response = await postRequest("$apiURL/user/login", request);
    var bearerToken = response["token"];
    //TODO: Save bearer token to local storage

    return response;
  }

  static Future<Map<String, dynamic>> signup(
      Map<String, String> request) async {
    var response = await postRequest("$apiURL/user", request);
    //TODO: Initiate login session of newly created user

    return response;
  }

  static void logout() {
    //TODO: Drop session
  }

  static Future<Map<String, dynamic>> postRequest(
      String url, Map<String, String> params) async {
    //Setup URI
    var httpClient = HttpClient();
    var uri = Uri.parse(url);

    //Setup request
    var request = await httpClient.postUrl(uri);

    if (params["username"] != null) {
      var bearerAuth =
          'Bearer ${base64Encode("${params["username"]}:${params["password"]}".codeUnits)}';
      request.headers.set('authorization', bearerAuth);
    }

    if (params["email"] != null) {
      var bearerAuth =
          'Bearer ${base64Encode("${params["email"]}:${params["password"]}".codeUnits)}';
      request.headers.set('authorization', bearerAuth);
    }

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

import 'dart:convert';
import 'dart:io';

class SessionProvider {
  static const apiAddress = "localhost";
  static const apiPort = "5000";
  static const apiURL = "http://$apiAddress:$apiPort";

  static Future<Map<String, dynamic>> login(Map params) async {
    if (params["username"] != null) {
      //Add auth header if username is provided
      params["Bearer"] =
          base64Encode("${params["username"]}:${params["password"]}".codeUnits);
    } else if (params["email"] != null) {
      //Add auth header if email is provided
      params["Bearer"] =
          base64Encode("${params["email"]}:${params["password"]}".codeUnits);
    } else {
      return null; //TODO: ERR?
    }

    var response = await postRequest("$apiURL/user/login", params);
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

    if (params["Bearer"] != null) {
      request.headers.set('Authorization', 'Bearer ${params["Bearer"]}');
      params.remove("Bearer");
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

import 'package:google_sign_in/google_sign_in.dart';

class GoogleSignInApi {
  static final _googleSignIn = GoogleSignIn(
    clientId:
        "223808821025-mghhm2j4r2mdol5sacllqt1apfso06g7.apps.googleusercontent.com",
    scopes: <String>[
      'email',
      'https://www.googleapis.com/auth/contacts.readonly',
    ],
  );

  static Future<GoogleSignInAccount> Login() => _googleSignIn.signIn();
  static Future<GoogleSignInAccount> SignOut() => _googleSignIn.signOut();

  static Future<GoogleSignInAccount> getAccount() async {
    GoogleSignInAccount account = _googleSignIn.currentUser;

    // If account is null, try to sign in silently
    account ??= await _googleSignIn.signInSilently();
    return account;
  }
}

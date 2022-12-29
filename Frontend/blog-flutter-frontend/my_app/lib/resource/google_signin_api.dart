import 'package:google_sign_in/google_sign_in.dart';
import 'package:my_app/resource/globalVar.dart';

class GoogleSignInApi {
  static final _googleSignIn = GoogleSignIn(
    clientId:
        "223808821025-mghhm2j4r2mdol5sacllqt1apfso06g7.apps.googleusercontent.com",
    scopes: <String>[
      'email',
      'https://www.googleapis.com/auth/contacts.readonly',
    ],
  );

  static Future<GoogleSignInAccount> Login() {
    _googleSignIn.signIn().whenComplete(() => updateGlobals());
  }

  static Future<GoogleSignInAccount> SignOut() {
    _googleSignIn.signOut().whenComplete(() => updateGlobals());
  }

  static Future<GoogleSignInAccount> getAccount() async {
    GoogleSignInAccount account = _googleSignIn.currentUser;

    // If account is null, try to sign in silently
    account ??= await _googleSignIn
        .signInSilently()
        .whenComplete(() => updateGlobals());

    return account;
  }

  static void updateGlobals() {
    if (_googleSignIn.currentUser != null) {
      Globals.SIGNED_IN = true;
      Globals.USER_ID = _googleSignIn.currentUser.id;
    } else {
      Globals.SIGNED_IN = false;
      Globals.USER_ID = null;
    }
  }
}

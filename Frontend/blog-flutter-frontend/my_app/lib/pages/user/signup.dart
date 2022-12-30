import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:my_app/pages/user/login.dart';
import 'package:my_app/pages/user/signup.dart';

import '../../resource/globalVar.dart';
import '../../resource/sessionProvider.dart';

class SignUp extends StatefulWidget {
  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  TextEditingController userNameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  final RegExp emailCheck = Globals.REGEXP['email'];
  final RegExp userCheck = Globals.REGEXP['username'];
  final RegExp passwordCheck = Globals.REGEXP['password'];

  validate(input) {
    return emailCheck.hasMatch(input) || userCheck.hasMatch(input);
  }

  handleSignUp() {
    if (!emailCheck.hasMatch(emailController.text) ||
        !userCheck.hasMatch(userNameController.text) ||
        !passwordCheck.hasMatch(passwordController.text)) {
      print("Invalid input!"); //TODO: Handle this
      return;
    }

    final requestParams = {
      'email': emailController.text,
      'username': userNameController.text,
      'password': passwordController.text
    };

    SessionProvider.signup(requestParams);
  }

  var _obscurePassword = true;
  var _hoveringLink = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Center(
        child: SizedBox(
            width: 300,
            height: 500,
            child: Column(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Text('Sign up', style: theme.textTheme.displaySmall),
                const SizedBox(
                  height: 50,
                ),
                SizedBox(
                  height: 100,
                  child: TextFormField(
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    validator: (input) => userCheck.hasMatch(input)
                        ? null
                        : "Allowed characters: [a-z, A-Z, 0-9, _]",
                    controller: userNameController,
                    decoration: const InputDecoration(
                      hintText: 'Username',
                    ),
                  ),
                ),
                SizedBox(
                  height: 100,
                  child: TextFormField(
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    validator: (input) =>
                        emailCheck.hasMatch(input) ? null : "Invalid E-mail",
                    controller: emailController,
                    decoration: const InputDecoration(
                      hintText: 'E-mail',
                    ),
                  ),
                ),
                SizedBox(
                  height: 100,
                  child: TextFormField(
                      obscureText: _obscurePassword,
                      autovalidateMode: AutovalidateMode.onUserInteraction,
                      validator: (input) => passwordCheck.hasMatch(input)
                          ? null
                          : "Invalid password. Must be 1-50 characters.",
                      controller: passwordController,
                      decoration: InputDecoration(
                        hintText: 'Password',
                        suffixIcon: IconButton(
                          icon: Icon(
                            _obscurePassword
                                ? Icons.visibility
                                : Icons.visibility_off,
                            color: Theme.of(context).primaryColorDark,
                          ),
                          onPressed: () {
                            setState(() {
                              _obscurePassword = !_obscurePassword;
                            });
                          },
                        ),
                      )),
                ),
                ElevatedButton(
                  child: const Text('Sign up'),
                  onPressed: handleSignUp,
                ),
                const SizedBox(
                  height: 50,
                ),
                InkWell(
                    onTap: () {
                      Get.to(Login(), transition: Transition.zoom);
                    },
                    onHover: (value) => setState(() {
                          _hoveringLink = value;
                        }),
                    hoverColor: Colors.transparent,
                    child: Text('Already have an account? Sign in here!',
                        style: theme.textTheme.bodySmall.copyWith(
                            color: _hoveringLink
                                ? theme.primaryColor
                                : theme.primaryColorDark))),
              ],
            )));
  }
}

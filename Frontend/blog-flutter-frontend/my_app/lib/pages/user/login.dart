import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:my_app/pages/user/signup.dart';
import 'package:my_app/resource/sessionProvider.dart';

import '../../resource/globalVar.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController idController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  final RegExp emailCheck = Globals.REGEXP['email'];
  final RegExp userCheck = Globals.REGEXP['username'];
  final RegExp passwordCheck = Globals.REGEXP['password'];

  validate(input) {
    return emailCheck.hasMatch(input) || userCheck.hasMatch(input);
  }

  handleLogin() {
    var requestParams = {};

    if (!validate(idController.text) ||
        !passwordCheck.hasMatch(passwordController.text)) {
      print("Invalid input!"); //TODO: Handle this
      return;
    }

    if (emailCheck.hasMatch(idController.text)) {
      requestParams['email'] = idController.text;
    } else {
      requestParams['username'] = idController.text;
    }

    //TODO: Don't send password in plaintext
    requestParams['password'] = passwordController.text;

    SessionProvider.login(requestParams);
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
                Text('Login', style: theme.textTheme.displaySmall),
                const SizedBox(
                  height: 50,
                ),
                SizedBox(
                  height: 100,
                  child: TextFormField(
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    validator: (input) => validate(input)
                        ? null
                        : "Please input a valid username or email.",
                    controller: idController,
                    decoration: const InputDecoration(
                      hintText: 'Username or E-mail',
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
                          : "Password must be between 1 and 50 characters.",
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
                  child: const Text('Login'),
                  onPressed: () {
                    handleLogin();
                  },
                ),
                const SizedBox(
                  height: 50,
                ),
                InkWell(
                    onTap: () {
                      Get.to(SignUp(), transition: Transition.zoom);
                    },
                    onHover: (value) => setState(() {
                          _hoveringLink = value;
                        }),
                    hoverColor: Colors.transparent,
                    child: Text("Don't have an account? Sign up here!",
                        style: theme.textTheme.bodySmall.copyWith(
                            color: _hoveringLink
                                ? theme.primaryColor
                                : theme.primaryColorDark))),
              ],
            )));
  }
}

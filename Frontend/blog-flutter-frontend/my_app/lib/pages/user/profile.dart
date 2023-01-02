import 'package:flutter/widgets.dart';

class Profile extends StatefulWidget {
  final user;

  Profile({@required this.user});

  @override
  _ProfileState createState() => _ProfileState(user: user);
}

class _ProfileState extends State<Profile> {
  final user;

  _ProfileState({this.user});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text("Hello, ${user["username"]}"),
    );
  }
}

import 'package:flutter/widgets.dart';

class Post extends StatefulWidget {
  final post;

  Post(this.post);

  @override
  State<StatefulWidget> createState() => SpecificPost(post);
}

class SpecificPost extends State<Post> {
  final post;

  SpecificPost(this.post);

  @override
  Widget build(BuildContext context) {}
}

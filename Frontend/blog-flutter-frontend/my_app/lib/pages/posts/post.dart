import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:my_app/widgets/postCard.dart';

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
  Widget build(BuildContext context) {
    return Scaffold(body: Column(children: [GenericPostCard(post: post)]));
  }
}

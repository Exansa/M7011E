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
    final theme = Theme.of(context);
    var screenSize = MediaQuery.of(context).size;

    return Center(
        child: SizedBox(
            width: 1200,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Image.network(
                  post["image"]["href"],
                  fit: BoxFit.fitWidth,
                ),
                Padding(
                    padding: EdgeInsets.symmetric(
                      vertical: screenSize.height / 50,
                    ),
                    child: Row(children: [
                      CircleAvatar(
                          backgroundImage:
                              NetworkImage(post["user"]["image"]["href"])),
                      Column(children: [
                        Text(post["title"],
                            style: theme.textTheme.displaySmall),
                        Text("by ${post["user"]["username"]}",
                            style: theme.textTheme.subtitle1)
                      ])
                    ])),
                RichText(
                    text: TextSpan(
                  children: [
                    TextSpan(
                        //Subject to change :)
                        text: post["category"]["name"],
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.grey[800])),
                    TextSpan(
                        text: " - ${post["content"]}",
                        style: theme.textTheme.bodyMedium)
                  ],
                ))
              ],
            )));
  }
}

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

    return Scaffold(
        body: Column(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        SizedBox(
          width: 1200,
          height: 630,
          child: FittedBox(
              clipBehavior: Clip.hardEdge,
              child: Image.network(
                post["image"]["href"],
                fit: BoxFit.fitWidth,
              )),
        ),
        Row(children: [
          CircleAvatar(
              backgroundImage: NetworkImage(post["user"]["image"]["href"])),
          Column(children: [
            Text(post["title"], style: theme.textTheme.displaySmall),
            Text("by ${post["user"]["username"]}",
                style: theme.textTheme.subtitle1)
          ])
        ]),
        RichText(
            overflow: TextOverflow.ellipsis,
            text: TextSpan(
              children: [
                TextSpan(
                    //Subject to change :)
                    text: post["category"]["name"],
                    style: TextStyle(
                        fontWeight: FontWeight.bold, color: Colors.grey[800])),
                // ignore: prefer_interpolation_to_compose_strings
                TextSpan(
                    text: " - ${post["content"]}",
                    style: theme.textTheme.bodyMedium)
              ],
            ))
      ],
    ));
  }
}

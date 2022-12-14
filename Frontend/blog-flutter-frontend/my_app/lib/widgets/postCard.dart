import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/pages/posts/post.dart';
import 'package:my_app/resource/globalVar.dart';

class GenericPostCard extends StatefulWidget {
  // ignore: prefer_typing_uninitialized_variables
  final post;

  const GenericPostCard({Key key, this.post}) : super(key: key);

  @override
  State<StatefulWidget> createState() => GenericPostCardState(post);
}

class GenericPostCardState extends State<GenericPostCard> {
  // ignore: prefer_typing_uninitialized_variables
  final post;

  GenericPostCardState(this.post);

  static final cardWidth = Globals.CARD_DIMENSIONS["width"];
  static final cardHeight = Globals.CARD_DIMENSIONS["height"];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
        child: SizedBox(
      width: cardWidth,
      height: cardHeight,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          SizedBox(
            width: cardWidth,
            height: 630 / 1200 * cardWidth,
            child: Image.network(
              post["image"]["href"],
              fit: BoxFit.fitWidth,
            ),
          ),
          ListTile(
              leading: CircleAvatar(
                  backgroundImage: NetworkImage(post["user"]["image"]["href"])),
              title: Text(post["title"]),
              subtitle: Text("by ${post["user"]["username"]}")),
          Padding(
              padding: EdgeInsets.symmetric(horizontal: cardWidth / 20),
              child: RichText(
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
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
                  ))),
          Row(mainAxisAlignment: MainAxisAlignment.start, children: [
            Visibility(
                visible: Globals.SIGNED_IN &&
                    (post["user"]["id"] == Globals.USER_ID),
                child: TextButton(
                  child: const Text('EDIT'),
                  onPressed: () {
                    Get.to(() => Post(post));
                  },
                )),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                TextButton(
                  child: const Text('VISIT'),
                  onPressed: () {
                    Get.to(() => Post(post));
                  },
                ),
                const SizedBox(width: 8),
                TextButton(
                  child: const Text('SHARE'),
                  onPressed: () {/* ... */},
                ),
                const SizedBox(width: 8),
              ],
            ),
          ])
        ],
      ),
    ));
  }
}

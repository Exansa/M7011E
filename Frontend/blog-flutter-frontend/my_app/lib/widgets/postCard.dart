import 'package:flutter/material.dart';
import 'package:my_app/resource/globalVar.dart';

class GenericPostCard extends StatelessWidget {
  // ignore: prefer_typing_uninitialized_variables
  final post;

  const GenericPostCard({Key key, this.post}) : super(key: key);

  static final cardWidth = Globals.CARD_DIMENSIONS["width"];
  static final cardHeight = Globals.CARD_DIMENSIONS["height"];

  @override
  Widget build(BuildContext context) {
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
              // ignore: prefer_interpolation_to_compose_strings
              subtitle: Text("by " + post["user"]["username"])),
          RichText(
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
                  // ignore: prefer_interpolation_to_compose_strings
                  TextSpan(text: " - " + post["content"])
                ],
              )),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              TextButton(
                child: const Text('VISIT'),
                onPressed: () {/* ... */},
              ),
              const SizedBox(width: 8),
              TextButton(
                child: const Text('SHARE'),
                onPressed: () {/* ... */},
              ),
              const SizedBox(width: 8),
            ],
          ),
        ],
      ),
    ));
  }
}

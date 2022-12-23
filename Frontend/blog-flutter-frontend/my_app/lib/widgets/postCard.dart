import 'package:flutter/material.dart';

class GenericPostCard extends StatelessWidget {
  final String post_title;
  final String description;
  final String image;
  final String author;
  final String authorImage;
  final String category;
  final String date;

  const GenericPostCard(
      {Key key,
      @required this.post_title,
      @required this.description,
      @required this.image,
      @required this.author,
      @required this.authorImage,
      @required this.category,
      @required this.date})
      : super(key: key);

  static const cardWidth = 500.0;
  static const cardHeight = 400.0;

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
              image,
              fit: BoxFit.fitWidth,
            ),
          ),
          ListTile(
              leading: CircleAvatar(backgroundImage: NetworkImage(authorImage)),
              title: Text(post_title),
              subtitle: Text("by $author")),
          Flexible(
              child: RichText(
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  text: TextSpan(
                    children: [
                      TextSpan(
                          //Subject to change :)
                          text: category.toUpperCase(),
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.grey[800])),
                      TextSpan(text: " - $description")
                    ],
                  ))),
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

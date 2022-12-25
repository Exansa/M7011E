import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/mock/db/posts.dart';
import 'package:my_app/pages/home.dart';
import 'package:my_app/resource/globalVar.dart';
import 'package:my_app/widgets/postCard.dart';

class Browse extends StatefulWidget {
  Browse({Key key}) : super(key: key);

  @override
  BrowseState createState() => BrowseState();
}

class BrowseState extends State<Browse> {
  final posts = getPosts();

  static final cardWidth = Globals.CARD_DIMENSIONS["width"];
  static final cardHeight = Globals.CARD_DIMENSIONS["height"];

  var cardCount = 4;
  var increaseBy = 4;
  var loading = false;

  //TODO: load more from db, this whole function is just a simulation
  handleLoadMore() {
    setState(() {
      loading = true;
    });
    Future.delayed(
        const Duration(seconds: 2),
        () => setState(() {
              loading = false;
            }));

    if (cardCount + increaseBy < posts.length) {
      setState(() {
        cardCount += increaseBy;
      });
    } else {
      setState(() {
        cardCount = posts.length;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Flexible(
              child: GridView.builder(
                  gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                      mainAxisExtent: cardHeight,
                      maxCrossAxisExtent: cardWidth,
                      childAspectRatio: 1.0,
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10),
                  itemCount: cardCount,
                  itemBuilder: (context, index) {
                    return GenericPostCard(post: posts[index]);
                  })),
          Visibility(
            visible: loading,
            child: const CircularProgressIndicator(),
          ),
          ElevatedButton(
              onPressed: handleLoadMore, child: const Text("Load more")),
        ],
      ),
    );
  }
}

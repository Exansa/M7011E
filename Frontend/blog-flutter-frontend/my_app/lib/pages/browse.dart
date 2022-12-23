import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/mock/db/posts.dart';
import 'package:my_app/pages/home.dart';
import 'package:my_app/resource/globalVar.dart';
import 'package:my_app/widgets/postCard.dart';

class Browse extends StatelessWidget {
  Browse({Key key}) : super(key: key);

  final posts = getPosts();

  static final cardWidth = Globals.CARD_DIMENSIONS["width"];
  static final cardHeight = Globals.CARD_DIMENSIONS["height"];

  var i_count = 4;
  var increaseBy = 4;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ElevatedButton(
              onPressed: () {
                Get.to(Home());
              },
              child: const Text("Open other screen")),
          Flexible(
              child: GridView.builder(
                  gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                      mainAxisExtent: cardHeight,
                      maxCrossAxisExtent: cardWidth,
                      childAspectRatio: 1.0,
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10),
                  itemCount: 9,
                  itemBuilder: (context, index) {
                    return GenericPostCard(post: posts[index]);
                  })),
          ElevatedButton(
              onPressed: () {
                //TODO: implement load more
              },
              child: const Text("Load more")),
        ],
      ),
    );
  }
}

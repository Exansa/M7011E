import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/pages/home.dart';
import 'package:my_app/widgets/postCard.dart';

class Browse extends StatelessWidget {
  const Browse({Key key}) : super(key: key);

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
          const GenericPostCard(
              post_title: "Test post",
              description:
                  "A very long text that is supposed to wrap after a while and if it doesn't wrap something is wrong. Anyways this text is supposed to be a description of the post and it should be a bit longer than the title.",
              image: "https://dummyimage.com/1200x630/000000/fff&text=Post",
              author: "BobbertTheThird",
              authorImage:
                  "https://dummyimage.com/500x500/000000/fff&text=User",
              category: "Category",
              date: "2022-12-24")
        ],
      ),
    );
  }
}

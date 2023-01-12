import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:my_app/widgets/videoPlayer.dart';

class About extends StatelessWidget {
  const About({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          VideoPlayerScreen(key),
          Text(
            "About this site",
            style: Theme.of(context).textTheme.headline3, // like <h1> in HTML
          ),
          RichText(
            text: TextSpan(
              text:
                  """            The project for M7011E 2022 by the group gamla och bittra; with
            Elliot Huber, Magnus Stenfelt, Peter Panduro and Tovah Parnes. Our
            project is a blog style website where we will make it using the
            frameworks NextJS and Dart and then compare the performance of the
            two different systems. They will have a shared backend and database
            so we can see the difference in them without other factors.""",
              style: DefaultTextStyle.of(context).style,
              children: const <TextSpan>[
                TextSpan(text: '\n\n'),
                TextSpan(
                    text:
                        """            You can post things and try the user functionality. If you ever
            become bored we have placed a nice little video here for you to
            watch. Enjoy!""",
                    style: TextStyle(fontWeight: FontWeight.bold)),
              ],
            ),
          )
        ],
      ),
    );
  }
}

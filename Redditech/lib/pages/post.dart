import 'package:flutter/material.dart';
import '../all.dart';

class NewPostPage extends StatefulWidget {
  const NewPostPage({ Key? key }) : super(key: key);

  @override
  _NewPostPageState createState() => _NewPostPageState();
}

class _NewPostPageState extends State<NewPostPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavDrawer(),
      drawer: NavDrawer(),
      appBar: NavAppBar(),
      body: Center(
          child: ElevatedButton(
        onPressed: () {
          Navigator.pop(context);
        },
        child: const Text('Go back from newpost Page!'),
      )),
    );
  }
}
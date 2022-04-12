import 'package:flutter/material.dart';
import '../all.dart';

class NavAppBar extends StatelessWidget with PreferredSizeWidget {
  @override
  Widget build(BuildContext context) {
    return AppBar(
        backgroundColor: Colors.white12,
        title: Container(
          width: double.infinity,
          height: 40,
          color: Colors.black26,
          child: Center(
              child: TextField(
                  decoration: InputDecoration(
            hintText: 'Search',
            hintStyle: TextStyle(fontSize: 18.0, color: Colors.white),
            prefixIcon: Icon(Icons.search, color: Colors.white),
          ))),
        ));
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}
import 'package:flutter/material.dart';

import 'package:redditech/all.dart';

void SelectedItem(BuildContext context, int index) {
  final LocalStorage storage = LocalStorage('redditech');
  switch (index) {
    case 6:
      Navigator.of(context).push(MaterialPageRoute(
        // ignore: prefer_const_constructors
        builder: (context) => ProfilePage(),
      ));
      break;
    case 7:
      Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => SettingsPage(),
      ));
      break;
    case 8:
      Navigator.pushNamed(context, '/Problems');
      Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => ProblemsPage(),
      ));
      break;
    case 9:
      Navigator.pushNamed(context, '/Nsfw');
      Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => NSFWPage(),
      ));
      break;
    case 10:
      storage.setItem('token', null);
      Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => App(),
      ));
      break;
    case 11:
      Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => EggPage(),
      ));
      break;
    case 0:
      Navigator.of(context)
          .push(MaterialPageRoute(builder: (context) => HomePage()));
      break;
    case 1:
      Navigator.of(context)
          .push(MaterialPageRoute(builder: (context) => SearchPage()));
      break;
    case 2:
      Navigator.of(context)
          .push(MaterialPageRoute(builder: (context) => NewPostPage()));
      break;
    case 3:
      Navigator.of(context)
          .push(MaterialPageRoute(builder: (context) => ChatPage()));
      break;
    case 4:
      Navigator.of(context)
          .push(MaterialPageRoute(builder: (context) => NotificationsPage()));
      break;
  }
}

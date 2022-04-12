import 'package:flutter/material.dart';
import '../all.dart';

class BottomNavDrawer extends StatefulWidget {
  const BottomNavDrawer({Key? key}) : super(key: key);

  @override
  BottomNavDrawerState createState() => BottomNavDrawerState();
}

class BottomNavDrawerState extends State<BottomNavDrawer> {
  int _selectedIndex = 0;
  PageController pageController = PageController();

  void onTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    SelectedItem(context, index);
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
        onTap: onTapped,
        //type: BottomNavigationBarType.fixed,
        //unselectedItemColor: Colors.grey,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        backgroundColor: Colors.white10,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home, size: 30.0),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search, size: 30.0),
            label: "Search",
          ),
          BottomNavigationBarItem(
              icon: Icon(Icons.add, size: 30.0), label: "Add"),
          BottomNavigationBarItem(
              icon: Icon(Icons.sms, size: 30.0), label: "Message"),
          BottomNavigationBarItem(
              icon: Icon(Icons.notifications_none, size: 30.0),
              label: "Notifications")
        ]);
  }
}
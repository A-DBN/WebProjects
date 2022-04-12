import 'package:flutter/material.dart';
import '../all.dart';

class EggPage extends StatefulWidget {
  const EggPage({ Key? key }) : super(key: key);

  @override
  _EggPageState createState() => _EggPageState();
}

class _EggPageState extends State<EggPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: BottomNavDrawer(),
        drawer: NavDrawer(),
        appBar: NavAppBar(),
        body: Image(
            fit: BoxFit.fill,
            width: double.infinity,
            height: double.infinity,
            image: NetworkImage(
                'https://s1.dmcdn.net/v/KN1Dq1S42X__NDPdL/x1080')));
  }
}
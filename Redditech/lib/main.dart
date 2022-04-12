// ignore_for_file: prefer_const_constructors
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'all.dart';

void main() => runApp(App());

class App extends StatefulWidget {
  const App({Key? key}) : super(key: key);

  @override
  _AppState createState() => _AppState();
}

class _AppState extends State<App> {
  final LocalStorage storage = LocalStorage('redditech');

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Redditech',
      theme: ThemeData(
        iconTheme: const IconThemeData(color: Colors.white),
        primaryColorDark: const Color(0xFF1a1a1b),
        canvasColor: const Color(0xFF1a1a1b),
        scaffoldBackgroundColor: Colors.black,
        textTheme: const TextTheme(
          bodyText1: TextStyle(fontSize: 18.0, color: Colors.white),
        ),
      ),
      routes: <String, WidgetBuilder>{
        '/Search': (BuildContext context) => const SearchPage(),
        '/NewPost': (BuildContext context) => const NewPostPage(),
        '/Chat': (BuildContext context) => const ChatPage(),
        '/Notifications': (BuildContext context) => const NotificationsPage(),
        '/Profile': (BuildContext context) => const ProfilePage(),
        '/Settings': (BuildContext context) => const SettingsPage(),
        '/Problems': (BuildContext context) => const ProblemsPage(),
        '/Nsfw': (BuildContext context) => const NSFWPage(),
        '/Home': (BuildContext context) => HomePage(),
      },
      home: Builder(
        builder: (context) => Scaffold(
          body: Container(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                const Text.rich(
                  TextSpan(
                    children: <TextSpan>[
                      TextSpan(
                        text: 'Redditech\n',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                          fontSize: 48,
                        ),
                      ),
                      TextSpan(
                          text: 'Mieux que reddit',
                          style: TextStyle(
                            fontStyle: FontStyle.italic,
                            color: Colors.white,
                            fontSize: 12,
                          )),
                    ],
                  ),
                ),
                Image.asset("assets/login_icon.png"),
                ElevatedButton(
                  onPressed: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) => LoginRoute()));
                  },
                  child: const Text("Log In"),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class RandomWords extends StatefulWidget {
  @override
  _RandomWordsState createState() => _RandomWordsState();
}

class _RandomWordsState extends State<RandomWords> {
  final LocalStorage storage = LocalStorage('redditech');

  @override
  Widget build(BuildContext context) {
    if (storage.getItem('token') == null) {
      return Text(
        'There was an error while loading the token, press the home page button to refresh',
        style: TextStyle(color: Colors.white),
      );
    } else {
      return Text(
        storage.getItem('token'),
        style: TextStyle(color: Colors.white),
      );
    }
  }
}

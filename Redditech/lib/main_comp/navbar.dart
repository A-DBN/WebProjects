import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../all.dart';

class NavDrawer extends StatefulWidget {
  const NavDrawer({Key? key}) : super(key: key);

  @override
  NavDrawerState createState() {
    return NavDrawerState();
  }
}


class NavDrawerState extends State<NavDrawer> {
  bool _ready = false;
  late User _user;
  @override
  void initState() {
    super.initState();
    initUser();
  }

  Future<void> initUser() async {
    final LocalStorage storage = new LocalStorage('redditech');
    String token = storage.getItem('token');

    var response = await http.get(
        Uri.parse("https://oauth.reddit.com/api/v1/me?raw_json=1"),
        headers: {
          'authorization': 'bearer ' + token,
        });
    Map<String, dynamic> resp = jsonDecode(response.body);

    _user = User(
      name: resp['subreddit']['display_name'],
      icon: resp['subreddit']['icon_img'],
      title: resp['subreddit']['title'],
      description: resp['subreddit']['public_description'],
      karma: resp['total_karma'],
    );
    setState(() {
      _ready = true;
    });
  }
  @override
  Widget build(BuildContext context) {
    if (_ready == false) {
      return Container(
        child: Center(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              SizedBox(child: CircularProgressIndicator(), height: 200, width: 200),
            ],
          ),
        )
      );    } else {
      return Drawer(
          child: Column(
        children: <Widget>[
          DrawerHeader(
            child: CircleAvatar(
              radius: 100,
              backgroundImage: NetworkImage(
                  _user.icon),
            ),
          ),
          RichText(
            textAlign: TextAlign.center,
            textScaleFactor: 2.0,
            text: TextSpan(
              style: TextStyle(color: Colors.white),
              children: <TextSpan>[
                TextSpan(text: _user.name.replaceAll('_', '/')),
              ],
            ),
          ),
          Divider(
            color: Colors.white24,
            height: 18.0,
          ),
          Expanded(
              flex: 1,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Column(
                    children: <Widget>[
                      ListTile(
                        leading: Icon(
                          Icons.account_circle_outlined,
                          color: Colors.white,
                        ),
                        title: Text('Profile'),
                        onTap: () => SelectedItem(context, 6),
                      ),
                      ListTile(
                        leading: Icon(
                          Icons.settings,
                          color: Colors.white,
                        ),
                        title: Text("Settings"),
                        onTap: () => SelectedItem(context, 7),
                      ),
                      ListTile(
                        leading:
                            Icon(Icons.report_problem, color: Colors.white),
                        title: Text("Report Problem"),
                        onTap: () => SelectedItem(context, 8),
                      ),
                      ListTile(
                        leading: Icon(Icons.whatshot, color: Colors.white),
                        title: Text("NSFW"),
                        onTap: () => SelectedItem(context, 9),
                      ),
                    ],
                  ),
                  Column(
                    children: <Widget>[
                      ListTile(
                        leading: Icon(Icons.logout, color: Colors.white),
                        title: Text("Log out"),
                        onTap: () => SelectedItem(context, 10),
                      ),
                    ],
                  )
                ],
              ))
        ],
      ));
    }
  }
}
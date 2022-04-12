import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../all.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({ Key? key }) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
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
      );
    } else {
      return Scaffold(
          bottomNavigationBar: BottomNavDrawer(),
          drawer: NavDrawer(),
          appBar: NavAppBar(),
          body: Card(
              color: Colors.grey[900],
              shape: RoundedRectangleBorder(
                side: BorderSide(color: Colors.white70, width: 1),
                borderRadius: BorderRadius.circular(10),
              ),
              margin: EdgeInsets.all(20.0),
              child: Container(
                  child: Column(
                children: <Widget>[
                  ListTile(
                    minVerticalPadding: 40,
                    title: CircleAvatar(
                      radius: 100,
                      backgroundImage: NetworkImage(
                          _user.icon),
                    ),
                  ),
                  ListTile(
                    title: Text(
                      _user.name.replaceAll('_', '/'), // replace zenkiud by user.name
                      style: TextStyle(color: Colors.white, fontSize: 40),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  TextButton(
                    style: TextButton.styleFrom(
                        textStyle: const TextStyle(color: Colors.orange)),
                    child: Text('Karma ' + _user.karma.toString() /* + user.karma */,
                        style: TextStyle(color: Colors.orange, fontSize: 27)),
                    onPressed: () => SelectedItem(context, 11),
                  ),
                  Divider(
                    color: Colors.white,
                    thickness: 2,
                  ),
                  ListTile(
                    title: Text(
                      _user.description, // user.description
                      style: TextStyle(color: Colors.white, fontSize: 20),
                      textAlign: TextAlign.justify,
                    ),
                  ),
                ],
              ))));
    }
  }
}
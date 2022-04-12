import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../all.dart';

class Posts extends StatefulWidget {
  const Posts({Key? key}) : super(key: key);
  @override
  _PostsState createState() => _PostsState();
}

class _PostsState extends State<Posts> {
  bool _ready = false;
  late Post _post;
  late List<Post> _postList = List.filled(0, _post, growable: true);
  @override
  void initState() {
    super.initState();
    initPost();
  }

  Future<void> initPost() async {
    final LocalStorage storage = LocalStorage('redditech');
    String token = storage.getItem('token');
    print("=========== token: " + token);
    var response =
        await http.get(Uri.parse("https://oauth.reddit.com/"), headers: {
      'authorization': 'bearer ' + token,
    });
    Map<String, dynamic> resp = jsonDecode(response.body);

    for (var element in resp['data']['children']) {
      _post = Post(
        subreddit: element['data']['subreddit_name_prefixed'],
        title: element['data']['title'],
        upvote: element['data']['ups'],
        url: element['data']['url'],
        author: element['data']['author'],
        isvideo: element['data']['is_video'],
        isself: element['data']['is_self'],
      );
      _post.next = element['data']['after'];
      _postList.add(_post);
    }
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
      return ListView.builder(
        itemBuilder: (BuildContext context, int index) {
          if (index >= 25) {
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
            return Card(
                child: Column(
              children: <Widget>[
                ListTile(
                  title: Text(_postList[index].subreddit),
                  subtitle: Text(_postList[index].title),
                ),
                if (_postList[index].isself != true)
                  Image(
                      fit: BoxFit.fill,
                      image: NetworkImage(_postList[index].url)),
              ],
            ));
          }
        },
      );
    }
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Redditech',
      theme: ThemeData(
        iconTheme: IconThemeData(color: Colors.white),
        primaryColorDark: Color(0xFF1a1a1b),
        canvasColor: Color(0xFF1a1a1b),
        scaffoldBackgroundColor: Colors.black,
        textTheme: const TextTheme(
          bodyText1: TextStyle(fontSize: 18.0, color: Colors.white),
        ),
      ),
      home: Scaffold(
        bottomNavigationBar: BottomNavDrawer(),
        drawer: NavDrawer(),
        appBar: NavAppBar(),
        body: Posts(),
      ),
      routes: <String, WidgetBuilder>{
        '/Home': (BuildContext context) => HomePage(),
        '/Search': (BuildContext context) => SearchPage(),
        '/NewPost': (BuildContext context) => NewPostPage(),
        '/Chat': (BuildContext context) => ChatPage(),
        '/Notifs': (BuildContext context) => NotificationsPage(),
        '/Profile': (BuildContext context) => ProfilePage(),
        '/Settings': (BuildContext context) => SettingsPage(),
        '/Problems': (BuildContext context) => ProblemsPage(),
        '/Nsfw': (BuildContext context) => NSFWPage(),
        '/Login': (BuildContext context) => LoginRoute(),
        '/Egg': (BuildContext context) => EggPage(),
      },
    );
  }
}

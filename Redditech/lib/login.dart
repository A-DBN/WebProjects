import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'all.dart';

class LoginRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LoginPage();
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginPage> {
  final LocalStorage storage = LocalStorage('redditech');
  final flutterWebviewPlugin = FlutterWebviewPlugin();

  late StreamSubscription _onDestroy;
  late StreamSubscription<String> _onUrlChanged;
  late StreamSubscription<WebViewStateChanged> _onStateChanged;
  late String code;
  late String token;

  @override
  void dispose() {
    _onDestroy.cancel();
    _onUrlChanged.cancel();
    _onStateChanged.cancel();
    flutterWebviewPlugin.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();

    flutterWebviewPlugin.close();

    _onDestroy = flutterWebviewPlugin.onDestroy.listen((_) {});
  }

  void getAndCheckToken(String code) async {
    Map data = {
      'grant_type': 'authorization_code',
      'code': code,
      'redirect_uri': 'https://www.google.com/',
    };
    String basicAuth =
        'Basic ' + base64Encode(utf8.encode('9soLMfvfiT27O-tS1gDQ2w:'));
    final response = await http.post(
      Uri.parse('https://www.reddit.com/api/v1/access_token'),
      headers: {
        HttpHeaders.authorizationHeader: basicAuth,
        HttpHeaders.contentTypeHeader: 'application/x-www-form-urlencoded',
      },
      body: data,
    );
    final resp = jsonDecode(response.body);
    //check token

    final checker = await http.get(Uri.https('oauth.reddit.com', '/api/v1/me'),
        headers: {
          HttpHeaders.authorizationHeader: 'bearer ${resp['access_token']}'
        });
    if (checker.statusCode == 200) {
      storage.setItem('token', resp['access_token']);
    }
  }

  _LoginScreenState() {
    _onStateChanged = flutterWebviewPlugin.onStateChanged
        .listen((WebViewStateChanged state) {});

    _onUrlChanged = flutterWebviewPlugin.onUrlChanged.listen((String url) {
      if (mounted) {
        setState(() {
          if (url.contains("code=")) {
            RegExp exp = RegExp("(?<=code=).*?(?=#)");
            code = exp.firstMatch(url)!.group(0)!;
            //request POST with code, get access token from JSON
            getAndCheckToken(code);
            Navigator.of(context).pushNamedAndRemoveUntil(
                "/Home", (Route<dynamic> route) => false);
            flutterWebviewPlugin.close();
          }
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    String loginUrl =
        "https://www.reddit.com/api/v1/authorize.compact?client_id=9soLMfvfiT27O-tS1gDQ2w&response_type=code&scope=identity account edit mysubreddits privatemessages read report submit subscribe vote&duration=temporary&state=stte&redirect_uri=https://www.google.com/";
    return WebviewScaffold(
        url: loginUrl,
        appBar: AppBar(
          // ignore: prefer_const_constructors
          title: Text("Login to reddit..."),
        ));
  }
}

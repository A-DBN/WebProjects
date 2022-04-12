import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../all.dart';
import '../class/settings.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({ Key? key }) : super(key: key);

  @override
  _SettingsPageState createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  bool _ready = false;
  late Settings _settings;
  @override
  void initState() {
    super.initState();
    initUser();
  }

  Future<void> initUser() async {
    final LocalStorage storage = new LocalStorage('redditech');
    String token = storage.getItem('token');

    var response = await http.get(
        Uri.parse("https://oauth.reddit.com/api/v1/me/prefs?raw_json=1"),
        headers: {
          'authorization': 'bearer ' + token,
        });
    Map<String, dynamic> resp = jsonDecode(response.body);

    _settings = Settings(
      autoPlay: resp['video_autoplay'],
      showPresence: resp['show_presence'],
      labelNSFW: resp['label_nsfw'],
      over18: resp['over_18'],
      hideAds: resp['hide_ads'],
      nightmode: resp['nightmode'],
      enableFollowers: resp['enable_followers']
    );
    setState(() {
      _ready = true;
    });
  }
  @override
  Widget build(BuildContext context) {
    if (!_ready) {
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
        body: Column(
              children: <Widget>[
                Card(
                  color: Colors.grey[900],
                  margin: EdgeInsets.all(10),
                  child: SwitchListTile(
                    title: Text('Auto Play', style: TextStyle(color: Colors.white)),
                    value: _settings.autoPlay ?? false,
                    onChanged: (bool value) {
                      setState(() {
                      _settings.autoPlay = value;
                      Settings.updateSettings('video_autoplay', _settings.autoPlay);
                      });
                    },
                  ),
                ),
                Card(
                  color: Colors.grey[900],
                  margin: EdgeInsets.all(10),
                  child: SwitchListTile(
                    title: Text('Show Presence', style: TextStyle(color: Colors.white)),
                    value: _settings.showPresence ?? false,
                    onChanged: (bool value) {
                      setState(() {
                        _settings.showPresence = value;
                        Settings.updateSettings('show_presence', _settings.showPresence);
                      });
                    },
                  ),
                ),
                Card(
                  color: Colors.grey[900],
                  margin: EdgeInsets.all(10),
                  child: SwitchListTile(
                    title: Text('Label NSFW', style: TextStyle(color: Colors.white)),
                    value: _settings.labelNSFW ?? false,
                    onChanged: (bool value) {
                      setState(() {
                        _settings.labelNSFW= value;
                        Settings.updateSettings('label_nsfw', _settings.labelNSFW);
                      });
                    },
                  ),
                ),
                Card(
                  color: Colors.grey[900],
                  margin: EdgeInsets.all(10),
                  child: SwitchListTile(
                    title: Text('Over 18+', style: TextStyle(color: Colors.white)),
                    value: _settings.over18 ?? false,
                    onChanged: (bool value) {
                      setState(() {
                        _settings.over18 = value;
                        Settings.updateSettings('over_18', _settings.over18);
                      });
                    },
                  ),
                ),
                Card(
                  color: Colors.grey[900],
                  margin: EdgeInsets.all(10),
                  child: SwitchListTile(
                    title: Text('hide Ads', style: TextStyle(color: Colors.white)),
                    value: _settings.hideAds ?? false,
                    onChanged: (bool value) {
                      setState(() {
                        _settings.hideAds = value;
                        Settings.updateSettings('hide_ads', _settings.hideAds);
                      });
                    },
                  ),
                ),
                Card(
                  color: Colors.grey[900],
                  margin: EdgeInsets.all(10),
                  child: SwitchListTile(
                    title: Text('Activate Nightmode', style: TextStyle(color: Colors.white)),
                    value: _settings.nightmode ?? false,
                    onChanged: (bool value) {
                      setState(() {
                        _settings.nightmode = value;
                        Settings.updateSettings('nightmode', _settings.nightmode);
                      });
                    },
                  ),
                ),
                Card(
                  color: Colors.grey[900],
                  margin: EdgeInsets.all(10),
                  child: SwitchListTile(
                    title: Text('Enable Followers', style: TextStyle(color: Colors.white)),
                    value: _settings.enableFollowers ?? false,
                    onChanged: (bool value) {
                      setState(() {
                        _settings.enableFollowers = value;
                        Settings.updateSettings('enable_followers', _settings.enableFollowers);
                      });
                    },
                  ),
                ),
              ],
          )
        );
    } 
  }
}
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:localstorage/localstorage.dart';

class Settings {
    bool? autoPlay;
    bool? showPresence;
    bool? labelNSFW;
    bool? over18;
    bool? hideAds;
    bool? nightmode;
    bool? enableFollowers;

    Settings({
        required this.autoPlay,
        required this.showPresence,
        required this.labelNSFW,
        required this.over18,
        required this.hideAds,
        required this.nightmode,
        required this.enableFollowers,
    });

    Settings.fromJson(Map<String, dynamic> json) {
      autoPlay = json['video_autoplay'];
      showPresence = json['show_presence'];
      labelNSFW = json['label_nsfw'];
      over18 = json['over_18'];
      hideAds = json['hide_ads'];
      nightmode = json['nightmode'];
      enableFollowers = json['enable_followers'];
    }

    static String patchSettings(String keyName, bool? keyValue) {
      String _body = '{"$keyName": "$keyValue"}';
      return _body;
    }

    static updateSettings(String keyName, bool? keyValue) async {
        final LocalStorage storage = LocalStorage('redditech');
        String token = storage.getItem('token');
        final response = await http.patch(
          Uri.parse('https://oauth.reddit.com/api/v1/me/prefs'),
          headers: <String, String>{
            'authorization': 'Bearer ' + token,
            'Content-Type': 'text/plain',
          },
          body: patchSettings(keyName, keyValue),
        );
        if (response.statusCode == 200) {
          return Settings.fromJson(jsonDecode(response.body));
        } else {
          throw Exception('Failed to update settings');
      }
    }
}
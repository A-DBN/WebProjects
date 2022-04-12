import axios from 'axios';
import { auth } from '../../../firebase';

export async function SubscribeToChannel(service, channel) {
  var user = auth.currentUser;
  console.log("Subscribing to " + channel + " on " + service);
  try {
      const r = await axios.get('http://'+backAdress+'/service/subscribe', {
        params: { uid: user.uid, service: service, channel: channel }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function SubscribeToServiceIntra(davude) {
  var user = auth.currentUser;
  console.log("Subscribing to intra service");
  try {
      const r = await axios.get('http://'+backAdress+'/service/subscribe', {
        params: { uid: user.uid, service: 'intra', oauth_token: davude }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function SubscribeToServiceWeather(city) {
  var user = auth.currentUser;
  console.log("Subscribing to weather service");
  try {
      const r = await axios.get('http://'+backAdress+'/service/subscribe', {
        params: { uid: user.uid, service: 'weather', city: city }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function SubscribeToServiceNews(domain) {
  var user = auth.currentUser;
  console.log("Subscribing to news service");
  try {
      const r = await axios.get('http://'+backAdress+'/service/subscribe', {
        params: { uid: user.uid, service: 'news', domain: domain }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function SubscribeToServiceCovid(covid) {
  var user = auth.currentUser;
  console.log("Subscribing to covid service");
  try {
      const r = await axios.get('http://'+backAdress+'/service/subscribe', {
        params: { uid: user.uid, service: 'covid', reg: covid }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function SubscribeToServiceGoogle() {
  var user = auth.currentUser;
  console.log("Subscribing to google translate service");
  try {
      const r = await axios.get('http://'+backAdress+'/service/subscribe', {
        params: { uid: user.uid, service: 'google' }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function SubscribeToServiceSpotify() {
  var user = auth.currentUser;
  console.log("Subscribing to spotify service");
  try {
      const r = await axios.get('http://'+backAdress+'/service/subscribe', {
        params: { uid: user.uid, service: 'spotify' }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function SubscribeToServiceDiscord(discord_id) {
  var user = auth.currentUser;
  console.log("Subscribing to discord service");
  try {
      const r = await axios.get('http://'+backAdress+'/service/subscribe', {
        params: { uid: user.uid, service: 'discord', user_id: discord_id}
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function SubscribeToAction(service, action) {
  var user = auth.currentUser;
  console.log("Subscribing to: " + action );
  try {
      const r = await axios.get('http://'+backAdress+'/area/subscribe', {
        params: { uid: user.uid, service: service, action: action }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function SendTranslate(txt, language) {
  var user = auth.currentUser;
  console.log("Sending traduction");
  try {
      const r = await axios.get('http://'+backAdress+'/google/translate', {
        params: { uid: user.uid, text: txt, to: language }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function UnsubscribeToAction(service, action) {
  var user = auth.currentUser;
  console.log("Unsubscribing from: " + action);
  try {
      const r = await axios.get('http://'+backAdress+'/area/unsubscribe', {
        params: { uid: user.uid, service: service, action: action }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}

export async function UnsubscribeFromService(service) {
  var user = auth.currentUser;
    console.log("Unsubscribing from " + service);
    try {
        const r = await axios.get('http://'+backAdress+'/service/unsubscribe', {
          params: { uid: user.uid, service: service }
        });
        const body = await r.data;
        if (r.status !== 200) {
          throw Error(body.message);
        }
        return body;
      } catch (error) {
        console.log(error);
      }
}

export async function isSubscribed(service) {
  var user = auth.currentUser;
  console.log("Checking if user is subscribed to service: " + service);
  try {
    const r = await axios.get('http://'+backAdress+'/service/isSubscribed', {
        params: { uid: user.uid, service: service }
      });
      const body = await r.data;
      if (r.status !== 200) {
        throw Error(body.message);
      }
      return body;
    } catch (error) {
      console.log(error);
    }
}
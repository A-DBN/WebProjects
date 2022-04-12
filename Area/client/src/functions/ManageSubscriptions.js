import axios from 'axios';
import { auth } from '../firebase';

export async function SubscribeToChannel(service, channel) {
    var user = auth.currentUser;
    console.log("Subscribing to " + channel + " on " + service);
    try {
        const r = await axios.get('http://localhost:8080/service/subscribe', {
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

export async function subscribeToIntra(autologin) {
    var user = auth.currentUser;
    console.log("Subscribing to Intra");
    try {
        const r = await axios.get('http://localhost:8080/service/subscribe', {
          params: { uid: user.uid, service: 'intra', oauth_token: autologin}
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

export async function SubscribeToService(service) {
    var user = auth.currentUser;
    console.log("Subscribing to " + service);
    try {
        const r = await axios.get('http://localhost:8080/service/subscribe', {
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

export async function UnsubscribeFromService(service) {
  var user = auth.currentUser;
    console.log("Unsubscribing from " + service);
    try {
        const r = await axios.get('http://localhost:8080/service/unsubscribe', {
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

export async function SubscribeToDiscord(id) {
  var user = auth.currentUser;
    console.log("Subscribing to Discord with id " + id);
    try {
        const r = await axios.get('http://localhost:8080/service/subscribe', {
          params: { uid: user.uid, service: 'discord', user_id: id }
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
      const r = await axios.get('http://localhost:8080/service/isSubscribed', {
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

export async function SubscribeToAction(service, action) {
  var user = auth.currentUser;
  console.log("Subscribing to: " + action + " on " + service);
  try {
      const r = await axios.get('http://localhost:8080/area/subscribe', {
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

export async function SendTextToTranslate(text, language) {
  var user = auth.currentUser;
  console.log("Sending text to translate: " + text);
  try {
      const r = await axios.get('http://localhost:8080/google/translate', {
        params: { uid: user.uid, text: text, to: language }
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

export async function SubscribeToServiceNews(keyword) {
  var user = auth.currentUser;
  console.log("Subscribing to news service");
  try {
      const r = await axios.get('http://localhost:8080/service/subscribe', {
        params: { uid: user.uid, service: 'news', domain: keyword }
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

export async function SubscribeToWeather(city) {
  var user = auth.currentUser;
  console.log("Subscribing to weather service");
  try {
      const r = await axios.get('http://localhost:8080/service/subscribe', {
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

export async function SubscribeToCovid(region) {
  var user = auth.currentUser;
  console.log("Subscribing to covid service");
  try {
      const r = await axios.get('http://localhost:8080/service/subscribe', {
        params: { uid: user.uid, service: 'covid', reg: region }
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

export async function UnsubscribeFromAction(service, action) {
  var user = auth.currentUser;
  console.log("Unsubscribing from: " + action);
  try {
      const r = await axios.get('http://localhost:8080/area/unsubscribe', {
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
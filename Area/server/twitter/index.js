const axios = require('axios');
const db = require('../firebase/database')
const mail = require('../mail/mail')


async function getUser(name) {
    var config = {
        method: 'get',
        url: `https://api.twitter.com/2/users/by/username/${name}`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + user.subscriptions.twitter.oauth_token, 
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
}

async function getMentions(req) {
    let user = db.getUser(req.query.uid)
    let userid = getUser(user.twitter.screen_name)
    var config = {
        method: 'get',
        url: `https://api.twitter.com/2/users/${userid.id}/mentions`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + user.subscriptions.twitter.oauth_token, 
        }
      };
      
      axios(config)
      .then(function (response) {
        if (response.data[0].id !== user.subscriptions.twitter.mention_id) {
          if (user.subscriptions.twitter.mention_id !== '')
            mail.sendMail(user.email, `Nouvelle mention twitter`)
          require('../firebase/database').editUser(user.uid, 'twitter', {mention_id: response.data[0].id})
        }
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
}

async function likedTweet(user, tweetId) {
    var config = {
        method: 'get',
        url: `https://api.twitter.com/2/users/${tweetId}/liking_users`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + user.subscriptions.twitter.oauth_token, 
        },
        data: {
            "text": text,
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        let users = JSON.stringify(response)
        sendTweet(user, `${users.meta.result_count} liked this tweet!`)
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
}

async function sendTweet(user, text) {
    var config = {
        method: 'post',
        url: 'https://api.twitter.com/2/tweets',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + user.subscriptions.twitter.oauth_token, 
        },
        data: {
            "text": text,
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
}

module.exports = {sendTweet, likedTweet, getMentions}
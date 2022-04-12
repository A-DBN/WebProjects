const axios = require('axios')
const env = require('dotenv').config()
var qs = require('qs')

async function getToken(code) {
    var data = qs.stringify({
        'code': code
      });
    var config = {
        method: 'post',
        url: `https://api.twitter.com/2/oauth2/token?grant_type=authorization_code&redirect_uri=http://localhost:8080/twitter/auth/callback&client_id=${process.env.client_id}&code_verifier=challenge`,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization': 'Basic ' + Buffer.from(process.env.client_id + ':' + process.env.client_secret).toString('base64')
        },
        data : data
    };
    return axios(config)
    .then(function (response) {
        return(response.data)
    })
    .catch(function (error) {
    console.log(error);
    });
}

async function getCode() {
    axios.get('https://twitter.com/i/oauth2/authorize', {
        params: {
            response_type: 'code',
            client_id: process.env.client_id,
            redirect_uri: 'http://localhost:8080/twitter/auth/callback',
            scope: 'tweet.read users.read follows.read follows.write tweet.write like.write list.read offline.access like.read',
            state: 'state',
            code_challenge: 'challenge',
            code_challenge_method: 'plain'
        }
    })
}

module.exports = { getToken, getCode }
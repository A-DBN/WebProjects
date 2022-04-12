const { default: axios } = require('axios')
const express = require('express')
    router = express.Router()
const db = require('../firebase/database')
const auth = require('./auth')
const twitter = require('./index')

function getTweet(tweetId) {
    return axios.get(`https://api.twitter.com/2/tweets/${tweetId}`)
}

function getProfile() {
    return axios.get('https://api.twitter.com/1.1/users/show.json?screen_name=ZenkiuD', {
        headers: {
            'authorization': 'Bearer RWlZNEVFTVNWMTE5TkFYM0VSeGc1WGg3b194dDNCQUdUeHJxbGVfLVdaR1JvOjE2NDU2MjY4MzQ2ODc6MToxOmF0OjE'
        },
    })
}

function getUserTweets(req) {
    const user = db.getUser(req.query.uid)
    return axios.get(`https://api.twitter.com/2/users/${user.subscriptions.twitter.user}/tweets`)
}

function getFollowers() {

    var config = {
        method: 'post',
        url: 'https://api.twitter.com/1.1/followers/list.json',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + 'RWlZNEVFTVNWMTE5TkFYM0VSeGc1WGg3b194dDNCQUdUeHJxbGVfLVdaR1JvOjE2NDU2MjY4MzQ2ODc6MToxOmF0OjE', 
        }
      };
      
      axios(config)
      .then(function (response) {
          console.log(JSON.stringify(response.data))
            //return JSON.stringify(response);
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
}

router.get('/followers', (req, res) => {
    //const profile = getProfile()
    //console.log(profile)
    var config = {
        method: 'post',
        url: 'https://api.twitter.com/1.1/followers/list.json',
      };
      
      axios(config)
      .then(function (response) {
          console.log(JSON.stringify(response.data))
            //return JSON.stringify(response);
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
      res.sendStatus(200)
})

router.get('/auth', (req, res) => {
    res.redirect("https://twitter.com/i/oauth2/authorize?response_type=code&client_id=RWdBSGdiMS0zSFo4MjNjTTU3Q1c6MTpjaQ&redirect_uri=http://localhost:8080/twitter/auth/callback&scope=tweet.read%20users.read%20follows.read%20follows.write%20tweet.write%20like.write%20like.read%20list.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain")
})

router.get('/auth/callback', (req, res) => {
    let code = req.query.code
    auth.getToken(code).then( (token) => {
        res.send(token)
    })
})

router.get('/getuser', (req, res) => {
    getUserTweets(req.query.userId).then( (response) => {
        res.send(response.data)
    })
})

module.exports = router
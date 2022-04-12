const axios = require('axios')
const { Router } = require('express')
const env = require('dotenv').config({path: '../.env'})

module.exports = {
    connect:  async () => {
        const oauth2 = require('simple-oauth2').create({
            client: {
                id: process.env.client_ID,
                secret: process.env.client_secret
            },
            auth: {
                authorizeHost: "https://www.reddit.com",
                authorizePath: "/api/v1/authorize",

                tokenHost: "https://www.reddit.com",
                tokenPath: "/api/v1/access_token"
            }
        })

        Router.get('/auth/reddit', (req, res) => {
            const authorizationUri = oauth2.authorizationCode.authorizeURL({
                redirect_uri: "http://localhost:8080/auth/reddit/callback",
                scope: ["identity"],
                state: 'random-unique-string'
            })

            res.redirect(authorizationUri)
        })

        Router.get('/auth/reddit/callback', async(req, res) => {
            const code = req.query.code
            const options = {
                code,
                state: 'same-random-unique-string',
                redirect_uri: 'http://localhost:8080/auth/reddit/callback'
            }

            try {
                const result = await oauth2.authorizationCode.getToken(options)
                const token = oauth2.accessToken.create(result)

                console.log(json(token))
                return res.status(200).json(token)
            } catch (err) {
                console.log('Access Token Error', err.message)
                return res.status(500).json("Auth failed")
            }
        })
    },
    getLastPosts: async (region, username) => {
        
    }
}


const axios = require('axios')
const env = require('dotenv').config()
const db = require('../firebase/database')
const mail = require("../mail/mail");

async function getSpotifyCharts(user) {
    let res = await axios.get(
        'https://spotfiy-charts.p.rapidapi.com/',
        {
            params: {
                type: 'viral',
                country: 'fr',
                recurrence: 'daily',
                date: 'latest'
            },
            headers: {
                'x-rapidapi-host': 'spotfiy-charts.p.rapidapi.com',
                'x-rapidapi-key': process.env.spotify_api_key
            }
        }
    )
    if (res.data.content && res.data.content[0].track_title !== user.val().subscriptions.spotify.trend) {
        mail.sendMail(user.val().email, `La musique du moment est ${res.data.content[0].track_title}`)
        db.editUser(user.key, '/subscriptions/spotify/trend', res.data.content[0].track_title)
    }
}

module.exports = { getSpotifyCharts }
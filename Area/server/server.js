const express = require('express');
const env = require('dotenv');
const about = require('./about');
const cors = require('cors')
const app = express();
const db = require('./firebase/database');
port = process.env.PORT || 8080;

require('./discord/index.js')

const firebase = require('./firebase/routes');
const twitter = require('./twitter/routes');
const mail = require('./mail/routes');
const google = require('./google/routes')
const twitch = require('./twitch/routes')

const YouTube = require("youtube-sr").default;

const intra = require('./intra/index')

app.get(['/', '/about.json'], (req, res) => {
    res.send(about.displayAbout(req))
});

app.use(cors())

app.get('/service/isDiscord', (req, res) => {
    db.getUser(req.query.uid).then(user => {
        if (user.subscriptions.discord.user_id !== '')
            res.sendStatus(200)
        else
            res.sendStatus(400)
    })
})

app.get('/service/isSubscribed', (req, res) => {
    db.getUser(req.query.uid).then((user) => {
        res.status(200).send(user.subscriptions[req.query.service].isSubscribed)
    })
})

app.get('/service/unsubscribe', (req, res) => {
    db.editUser(req.query.uid, `/subscriptions/${req.query.service}/isSubscribed`, false)
    res.sendStatus(200)
})

app.get('/service/subscribe', async (req, res) => {
    db.editUser(req.query.uid, `/subscriptions/${req.query.service}/isSubscribed`, true)
    if (req.query.oauth_token)
        db.editUser(req.query.uid, `/subscriptions/${req.query.service}/oauth_token`, req.query.oauth_token)
    switch (req.query.service) {
        case 'covid':
            db.editUser(req.query.uid, `/subscriptions/covid/reg`, req.query.reg)
            res.sendStatus(200)
            break
        case 'twitch':
            db.editUser(req.query.uid, `/subscriptions/twitch/channel`, req.query.channel)
            res.sendStatus(200)
            break
        case 'youtube':
            let data
            let dbuser
            if (req.query.channel === "") return res.sendStatus(400)
            await YouTube.search(req.query.channel).then(async (result) => {
                if (!result[0]) {
                    data = null
                }
            })
            if (data === null) {
                return res.sendStatus(400)
            }
            await db.getNoValUser(req.query.uid).then((result) => {
                dbuser = result
            })
            require('./youtube/index').getVideo(req.query.channel, dbuser).then((resp) => {
                data = resp
            }).finally(() => {
                if (data !== null) {
                    db.editUser(req.query.uid, `/subscriptions/youtube/channel`, data.author.replaceAll(' ', ''))
                    db.editUser(req.query.uid, `/subscriptions/youtube/video_id`, data.videoId)
                }
            })
            res.sendStatus(200)
            break
        case 'weather':
            let weather
            let ip
            try {
                await require('./weather/index').getCurrentWeatherByCity(req.query.city).then((condition) => {
                    weather = condition.data.current.condition.text
                })
            } catch (error) {
                db.editUser(req.query.uid, '/subscriptions/weather/isSubscribed', false)
                break
            }
            await require('./weather/index').getIP().then((res) => {
                ip = res.data.ip
            })
            db.editUser(req.query.uid, `/subscriptions/weather/city`, req.query.city)
            db.editUser(req.query.uid, `/subscriptions/weather/weather`, weather)
            db.editUser(req.query.uid, `/subscriptions/weather/ip`, ip)
            res.sendStatus(200)
            break
        case 'news':
            db.editUser(req.query.uid, `/subscriptions/news/domain`, req.query.domain)
            res.sendStatus(200)
            break
        case 'intra':
            const user = await intra.getProfile(req.query.uid)
            db.editUser(req.query.uid, `/subscriptions/intra/gpa`, parseFloat(user.gpa[0].gpa))
            db.editUser(req.query.uid, `/subscriptions/intra/netsoul`, user.nsstat.active)
            db.editUser(req.query.uid, `/subscriptions/intra/credits`, user.credits)
            db.editUser(req.query.uid, `/subscriptions/intra/alerts`, intra.getAlerts(req.query.uid))
            res.sendStatus(200)
            break
        case 'twitter':
            db.editUser(req.query.uid, `/subscriptions/twitter/screen_name`, req.query.screen_name)
            await require('./twitter/index').getMentions(req.query.screen_name)
            res.sendStatus(200)
            break
        case 'discord':
            db.editUser(req.query.uid, `/subscriptions/discord/user_id`, req.query.user_id)
            res.sendStatus(200)
            break
        case 'spotify':
            res.sendStatus(200)
            break
    }
})

app.get('/area/subscribe', (req, res) => {
    db.editUser(req.query.uid, `/subscriptions/${req.query.service}/actions/${req.query.action}`, true)
    res.sendStatus(200)
})

app.get('/area/unsubscribe', (req, res) => {
    db.editUser(req.query.uid, `/subscriptions/${req.query.service}/actions/${req.query.action}`, false)
    res.sendStatus(200)
})

app.use('/auth', firebase);
app.use('/twitter', twitter);
app.use('/mail', mail)
app.use('/google', google)
app.use('/twitch', twitch)

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on the port ${port}`);
});
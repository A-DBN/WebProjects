const ytch = require('yt-channel-info')
const env = require('dotenv').config()
const db = require('../firebase/database')
const axios = require('axios')
const YouTube = require("youtube-sr").default;

const mail = require('../mail/mail')

async function getVideo(channel, user) {
    let data
    if (channel === "") return
    await YouTube.search(channel).then(async (res) => {
        let channels = res.filter(item => item.channel.name.replaceAll(' ', '').toLowerCase() === channel.replaceAll(' ', '').toLowerCase())
        if (channels.length === 0) {
            data = null
        } else  {
            data = channels[0]
        }
    })
    if (data === null || data.length === 0) {
        mail.sendMail(user.val().email, `Erreur de récupération de la chaine youtube ${channel} pour l'action new_video`)
        return null
    }
    const payload = {
        channelId: data.channel.id,
        httpsAgent: 'agent',
        sortBy: 'newest'
    }
    return await ytch.getChannelVideos(payload).then((response) => {
        if (user.val().subscriptions.youtube.video_id === '') {
            db.editUser(user.key, '/subscriptions/youtube/video_id', response.items[0].videoId)
        }
        if (response.items[0].videoId !== user.val().subscriptions.youtube.video_id) {
            mail.sendMail(user.val().email, `Nouvelle video de ${response.items[0].author}`, 'Lien de la video : https://www.youtube.com/watch?v=' + response.items[0].videoId)
            db.editUser(user.key, '/subscriptions/youtube/video_id', response.items[0].videoId)
        }
        return response.items[0]
    }).catch((err) => {
        console.log(err)
    })
}

async function getChannelByName (channelName, user) {
    let data
    if (channelName === "") return
    await YouTube.search(channelName).then(async (res) => {
        if (!res[0]) return data = null
        data = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels`,
            {
                params: {
                    part: "snippet,statistics",
                    key: process.env.YOUTUBE_API_KEY,
                    id: res[0].channel.id,
                }
            }
        )
    })
    if (data === null) {
        mail.sendMail(user.val().email, `Erreur de récupération de la chaine youtube spécifiée pour l'action milestone`)
        return
    }
    if (data.data.items && user.val().subscriptions.youtube.sub_count === 0) {
        db.editUser(user.key, '/subscriptions/youtube/sub_count', data.data.items[0].statistics.subscriberCount)
    }
    if (data.data.items && user.val().subscriptions.youtube.sub_count !== 0) {
        let count = data.data.items[0].statistics.subscriberCount
        let last = user.val().subscriptions.youtube.sub_count
        if (last < 50000 && count > 50000 && last != 0) {
            mail.sendMail(user.val().email, 'Nouveau milestone atteint! Felicitation pour les 50 000 abonnés !')
            db.editUser(user.key, '/subscriptions/youtube/sub_count', count)
        }
        else if (last < 100000 && count > 100000 && last != 0) {
            mail.sendMail(user.val().email, 'Nouveau milestone atteint! Felicitation pour les 100 000 abonnés !')
            db.editUser(user.key, '/subscriptions/youtube/sub_count', count)
        }
        else if (last < 500000 && count > 500000 && last != 0) {
            mail.sendMail(user.val().email, 'Nouveau milestone atteint! Felicitation pour les 200 000 abonnés !')
            db.editUser(user.key, '/subscriptions/youtube/sub_count', count)
        }
        else if (last < 1000000 && count > 1000000 && last != 0) {
            mail.sendMail(user.val().email, 'Nouveau milestone atteint! Felicitation pour les 500 000 abonnés !')
            db.editUser(user.key, '/subscriptions/youtube/sub_count', count)
        } else {
            db.editUser(user.key, '/subscriptions/youtube/sub_count', count)
        }
    }
}

module.exports = {getVideo, getChannelByName}
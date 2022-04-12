const axios = require('axios')
const mail = require("../mail/mail");
const db = require("../firebase/database");
const env = require('dotenv').config()

async function getNews(user) {
    let res
    try {
        res = await axios.get(
            `https://newsapi.org/v2/everything`,
            {
                params: {
                    q: user.val().subscriptions.news.domain,
                    apiKey: process.env.news_api,
                    sortBy: 'publishedAt',
                    language: 'fr'
                }
            }
        )
    } catch (error) {
        db.editUser(user.key, '/subscriptions/news/isSubscribed', false)
        return
    }
    if (!res.data.articles[0]) {
        db.editUser(user.key, '/subscriptions/news/isSubscribed', false)
        return
    }
    if (res.data.articles[0].url !== user.val().subscriptions.news.id) {
        mail.sendMail(user.val().email, `La dernière news est ${res.data.articles[0].title}`, 'Lien de l\'article : ' + res.data.articles[0].url)
        db.editUser(user.key, '/subscriptions/news/id', res.data.articles[0].url)
    }
}

module.exports = {getNews}
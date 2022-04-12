const express = require('express')
const admin = require('../firebase/firebase');
require('firebase-admin');
router = express.Router()

const translate = require('./translate')

router.get('/translate', async (req, res) => {
    let user
    await require('../firebase/database').getUser(req.query.uid).then((res) => {
        user = res
    })
    return translate.getTranslation(req, res).then(result => {
        console.log(user.subscriptions.discord.user_id)
        if (user.subscriptions.discord.user_id === '') return res.sendStatus(400)
        require('../discord/index').sendResult(user.subscriptions.discord.user_id, req.query.text, result, req.query.to)
        return res.sendStatus(200)
    })
})

module.exports = router
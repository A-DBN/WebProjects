const express = require('express')
const db = require('../firebase/database')
router = express.Router()

const twitch = require('./index')

router.get('/stream', (req, res) => {
    twitch.getStream(req)
    res.sendStatus(200)
})

module.exports = router
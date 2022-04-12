const { default: axios } = require('axios')
const express = require('express')
    router = express.Router()
const db = require('../firebase/database')
const mail = require('./mail')

router.get('/sendMail', function(req, res) {
    mail.sendMail(req, res)
})

module.exports = router

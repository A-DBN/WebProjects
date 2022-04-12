const axios = require('axios')
const nodemon = require('nodemon')
const env = require('dotenv').config({path: '../.env'})

module.exports = {
    getUser: async function(autologin) {
        return await axios.get(
            `${autologin}/user?format=json`
        )
    }
}
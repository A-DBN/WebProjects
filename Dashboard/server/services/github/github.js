const axios = require('axios')
const env = require('dotenv').config({path: '../.env'})

module.exports = {
    getUserRepository: async (user, type, perpage) => {
        return await axios.get(
            `https://api.github.com/users/${user}/repos`,
            {
                params: {
                    type: type,
                    per_page: perpage
                }
            }
        )
    }
}
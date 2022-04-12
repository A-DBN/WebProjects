const axios = require('axios')
const env = require('dotenv').config({path: '../.env'})

module.exports = {
    getChampion: async (name, region) => {
        return axios.get(
            `https://ddragon.leagueoflegends.com/cdn/11.23.1/data/fr_FR/champion/${name}.json`
        )
    },
    getItem: async () => {
        return axios.get(
            `http://ddragon.leagueoflegends.com/cdn/11.23.1/data/fr_FR/item.json`
        )
    }
}

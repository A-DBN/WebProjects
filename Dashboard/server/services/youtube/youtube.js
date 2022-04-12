const axios = require('axios')
const env = require('dotenv').config({path: '../.env'})

module.exports = {
    getChannelByName: async (channelName) => {
        return await axios.get(
            `https://www.googleapis.com/youtube/v3/channels`,
            {
                params: {
                    part: "snippet,statistics",
                    key: process.env.YOUTUBE_API_KEY,
                    forUsername: channelName,
                }
            }
        )
    },
    getLastVideoByName: async (channelName, maxResults, order) => {
        let channel
        let request = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels`,
            {
                params: {
                    key: process.env.YOUTUBE_API_KEY,
                    forUsername: channelName,
                    part: 'id'
                }
            }
        ).then(response => {
            channel = response.data
            return channel
        })


        return axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
                params: {
                    part: 'snippet',
                    key: process.env.YOUTUBE_API_KEY,
                    channelId: channel.items[0].id,
                    maxResults: maxResults,
                    order: order
                }
            }
        )
    }
}
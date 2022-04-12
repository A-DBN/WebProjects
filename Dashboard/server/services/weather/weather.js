const axios = require('axios')
const nodemon = require('nodemon')
const env = require('dotenv').config({path: '../.env'})

module.exports = {
    getNextWeatherByCity: async (cityName) => {
        return axios(
            `http://api.weatherapi.com/v1/forecast.json`,
            {
                params: {
                    q: cityName,
                    key: process.env.weather_api_key,
                    days: 3,
                }
            }
        )
    },
    getCurrentWeatherByCity: async (cityName) => {
        return axios(
            `http://api.weatherapi.com/v1/current.json`,
            {
                params: {
                    key: process.env.weather_api_key,
                    q: cityName,
                }
            }
        )
    },
    getIP: async () => {
        return axios(
            `http://api.weatherapi.com/v1/ip.json`,
            {
                params: {
                    key: process.env.weather_api_key,
                    q: "auto:ip",
                }
            }
        )
    }
}
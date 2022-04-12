const axios = require('axios')
const env = require('dotenv').config()
const db = require('../firebase/database')
const mail = require("../mail/mail");

async function getCurrentWeatherByCity(cityName) {
    if (cityName === "") return null
    return axios(
        'http://api.weatherapi.com/v1/current.json',
        {
            params: {
                key: process.env.weather_api_key,
                q: cityName,
                lang: "fr"
            }
        }
    )
}

async function getIP () {
    return axios(
        `http://api.weatherapi.com/v1/ip.json`,
        {
            params: {
                key: process.env.weather_api_key,
                q: "auto:ip"
            }
        }
    )
}

async function refreshWeather (user, snapWeather) {
    let city
    let ip
    await getCurrentWeatherByCity(user.val().subscriptions.weather.city).then((weather) => {
        city = weather
    })
    if (city === null) return
    await getIP().then((res) => {
        ip = res.data.ip
    })
    snapWeather.child("actions").forEach(function (actions) {
        if (actions.val() === true) {
            switch (actions.key) {
                case 'weather_change':
                    if (user.val().subscriptions.weather.weather !== city.data.current.condition.text) {
                        mail.sendMail(user.val().email, `La météo a changé à ${city.data.location.name}, il fait maintenant ${city.data.current.condition.text}`)
                        db.editUser(user.key, '/subscriptions/weather/weather', city.data.current.condition.text)
                    }
                    break
                case 'ip_change':
                    if (user.val().subscriptions.weather.ip !== ip) {
                        mail.sendMail(user.val().email, 'Votre ip a changée !')
                        db.editUser(user.key, '/subscriptions/weather/ip', ip)
                    }
                    break
            }
        }
    })
}

module.exports = { getCurrentWeatherByCity, getIP, refreshWeather }
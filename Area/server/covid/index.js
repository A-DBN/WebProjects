const axios = require('axios')
const mail = require('../mail/mail')

async function getCovidData(uid) {
    let user = await require('../firebase/database').getUser(uid)
    let total_rea = 0
    let total_hosp = 0
    let res
    try {
        res = await axios.get(
            `https://coronavirusapifr.herokuapp.com/data/live/region/${user.subscriptions.covid.reg}`
        )
    } catch {
        require('../firebase/database').editUser(uid, '/subscriptions/covid/isSubscribed', false)
        return
    }
    if (res.data === "No data found") return
    res.data.forEach(element => {
        total_rea += element.rea
        total_hosp += element.hosp
    })
    let data = {
        rea: total_rea,
        hosp: total_hosp,
        reg: user.subscriptions.covid.reg
    }
    if (total_hosp !== user.subscriptions.covid.hosp && total_rea !== user.subscriptions.covid.rea) {
        if (user.subscriptions.discord.user_id !== '') {
            require('../discord/index').sendCovidResult(user, data)
        } else {
            mail.sendMail(user.email, "COnnect to discord to use covid service")
        }
        require('../firebase/database').editUser(uid, '/subscriptions/covid/hosp', total_hosp)
        require('../firebase/database').editUser(uid, '/subscriptions/covid/rea', total_rea)
    }
}

module.exports = { getCovidData }
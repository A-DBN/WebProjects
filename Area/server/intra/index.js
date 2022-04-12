const axios = require('axios');
const mail = require('../mail/mail');
require('firebase-admin')

async function getProfile(userId) {
    let autologin
    await require("../firebase/database").getUser(userId).then((user) => {
        autologin = user.subscriptions.intra.oauth_token;
    })
    const config = {
        method: 'get',
        url: `${autologin}/user?format=json`
    };
    return axios(config)
    .then(function (response) {
        return(response.data)
    })
    .catch(function (error) {
    console.log(error);
    });
}

async function getAlerts(userId) {
    let autologin
    await require("../firebase/database").getUser(userId).then((user) => {
        autologin = user.subscriptions.intra.oauth_token;
    })
    const config = {
        method: 'get',
        url: `${autologin}/user/notification/alert?format=json`
    };
    return await axios(config)
    .then((response) => {
        return(response.data[0].title)
    })
    .catch(function (error) {
        console.log(error);
    });
}

async function reactions(userId, actions) {
    let profile
    await getProfile(userId).then((res) => {
        if (res === undefined) return
        profile = res
    })
    let alerts
    await getAlerts(userId).then((res) => {
        if (res === undefined) return
        alerts = res
    })
    let data
    let user
    await require("../firebase/database").getUser(userId).then((res) => {
        user = res
        data = res.subscriptions.intra
    })
    if (actions === 'netsoul' && data.netsoul < profile.nsstat.active) {
        require('../firebase/database').editUser(userId, "/subscriptions/intra/netsoul", profile.nsstat.active)
        mail.sendMail(user.email, 'Netsoul sous la limite', 'Votre temps de connexion est inférieur a la limite renseignée')
    }
    if (actions === 'gpa' && parseFloat(data.gpa) !== parseFloat(profile.gpa[0].gpa)) {
        require('../firebase/database').editUser(userId, "/subscriptions/intra/gpa", parseFloat(profile.gpa[0].gpa))
        mail.sendMail(user.email, 'Votre GPA a évolué', `Votre Gpa a évolué passant de ${data.gpa} à ${profile.gpa[0].gpa}, pour plus d'informations rendez vous sur l'intra`)
    }
    if (actions === 'credits' && data.credits !== profile.credits) {
        require('../firebase/database').editUser(userId, "/subscriptions/intra/credits", profile.credits)
        mail.sendMail(user.email, 'Votre nombre de crédits a évolué', `Votre nombre de crédits est passé de ${data.credits} à ${profile.credits}`)
    }
    if (actions === 'alerts' && alerts !== data.alerts) {
        require('../firebase/database').editUser(userId, "/subscriptions/intra/alerts", alerts)
        mail.sendMail(user.email, 'Nouvelle notification', `Vous avez une nouvelle alert sur l'intra`)
    }
}

function refreshIntra(snapIntra, uuid) {
    snapIntra.child("actions").forEach(function (actions) {
        if (actions.val() === true) {
            reactions(uuid, actions.key).catch(error => console.log(error))
        }
    })
}


module.exports = {reactions, refreshIntra, getProfile, getAlerts}
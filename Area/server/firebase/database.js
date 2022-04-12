require('firebase-admin');
const { dbRef, db } = require('./firebase');

async function getUserByDiscordId(discordId) {
    let user
    const ref = db.ref("users").orderByKey();
    return await ref.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.child('subscriptions/discord/user_id').val() === discordId) {
                user = childSnapshot.val();
            }
            return false
        })
        return user
    })
}

async function getDiscordUsers() {
    let users = []
    const ref = db.ref("users").orderByKey();
    return await ref.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.hasChild('subscriptions/discord/user_id')) {
                if (childSnapshot.child('subscriptions/discord/user_id').val() !== '') {
                    users.push(childSnapshot.child('subscriptions/discord/user_id').val())
                }
            }
        })
        return users
    })
}

function getUser(userId) {
    const ref = db.ref('users/' + userId);
    return ref.once('value').then((snapshot) => {
        return snapshot.val()
    }).catch((e) => {
        return e;
    });
}

function getNoValUser(userId) {
    const ref = db.ref('users/' + userId);
    return ref.once('value').then((snapshot) => {
        return snapshot
    }).catch((e) => {
        return e;
    });
}

function editUser(userId, path, data) {
    const usersRef = db.ref('users/' + userId);
    usersRef.update({
        [path]:data
    })

}

function getUserSubscriptions() {
    const ref = db.ref("users").orderByKey();
    return ref.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            childSnapshot.child( "subscriptions")
                .forEach(function (service) {
                    if (service.val().isSubscribed === true) {
                        switch (service.key) {
                            case 'intra':
                                require('../intra/index').refreshIntra(service, childSnapshot.key)
                                break
                            case 'twitch':
                                if (service.child('actions/live_on').val() === true)
                                    require('../twitch/index').getStream(childSnapshot.key)
                                if (service.child('actions/milestone').val() === true)
                                    require('../twitch/index').getMilestone(childSnapshot.key)
                                break
                            case 'youtube':
                                if (service.child('actions/new_video').val() === true)
                                    require('../youtube/index').getVideo(service.child('channel').val(), childSnapshot)
                                if (service.child('actions/milestone').val() === true)
                                    require('../youtube/index').getChannelByName(service.child('channel').val(), childSnapshot)
                                break
                            case 'weather':
                                require('../weather/index').refreshWeather(childSnapshot, service)
                                break
                            case 'spotify':
                                if (service.child('actions/new_trend').val() === true) {
                                    require('../spotify/index').getSpotifyCharts(childSnapshot)
                                }
                                break
                            case 'news':
                                if (service.child('actions/new_news').val() === true)
                                    require('../news/index').getNews(childSnapshot)
                                break
                            case 'covid':
                                if (service.child('actions/tracker').val() === true)
                                    require('../covid/index').getCovidData(childSnapshot.key)
                                break
                        }
                    }
                    return false
            })
            return false;
        })
    })
}
setInterval(getUserSubscriptions, 50000);

module.exports = {getUserSubscriptions, editUser, getUser, getNoValUser, getUserByDiscordId, getDiscordUsers};
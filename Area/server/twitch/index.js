const TwitchApi = require("node-twitch").default;
const env = require('dotenv').config()
const mail = require('../mail/mail')
const db = require('../firebase/database')
const {editUser} = require("../firebase/database");

const twitch = new TwitchApi({
    client_id: process.env.twitch_client_id,
    client_secret: process.env.twitch_client_secret
});

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

async function getMilestone(uid) {
    let user
    await db.getUser(uid).then((res) => {
        user = res
    })
    const users = await twitch.getUsers(user.subscriptions.twitch.channel)
    if (!users.data || users.data.length === 0) {
        return
    }
    if (!isEmptyObject(users)) {
        if (user.subscriptions.twitch.view_count === 0) {
            editUser(uid, `/subscriptions/twitch/view_count`, users.data[0].view_count)
        }
        else if (user.subscriptions.twitch.view_count < 50000 && users.data[0].view_count > 50000) {
            mail.sendMail(user.email, `You have reached the milestone for 50 000 views on your twitch channel !`);
        }
        else if (user.subscriptions.twitch.view_count < 100000 && users.data[0].view_count > 100000) {
            mail.sendMail(user.email, `You have reached the milestone for 100 000 views on your twitch channel !`);
        }
        else if (user.subscriptions.twitch.view_count < 500000 && users.data[0].view_count > 500000) {
            mail.sendMail(user.email, `You have reached the milestone for 500 000 views on your twitch channel !`);
        }
        else if (user.subscriptions.twitch.view_count < 1000000 && users.data[0].view_count > 1000000) {
            mail.sendMail(user.email, `You have reached the milestone for 1 000 000 views on your twitch channel !`);
        }
        else if (user.subscriptions.twitch.view_count < 10000000 && users.data[0].view_count > 10000000) {
            mail.sendMail(user.email, `You have reached the milestone for 10 000 000 views on your twitch channel !`);
        }
        if (user.subscriptions.twitch.view_count !== users.data[0].view_count) {
            editUser(uid, 'subscriptions/twitch/view_count', users.data[0].view_count);
        }
    }
}

async function getStream(uid) {
    let user
    await db.getUser(uid).then((res) => {
        user = res
    })
    const streams = await twitch.getStreams({ channel: user.subscriptions.twitch.channel })
    if (!isEmptyObject(streams.data)) {
        const users = await twitch.getUsers(user.subscriptions.twitch.channel)
        if (user.subscriptions.twitch.live_state === false) {
            editUser(uid, 'subscriptions/twitch/live_state', true);
            mail.sendMail(user.email, `${users.data[0].display_name} is streaming!`);
        }
    } else
        editUser(uid, 'subscriptions/twitch/live_state', false);
}

module.exports = {getStream, getMilestone, isEmptyObject}
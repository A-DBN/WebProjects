const {google} = require('googleapis');
const axios = require('axios');
const moment = require('moment');
const {getOauthByService} = require('./database');

module.exports.addEvents = async function(user) {
    let google_auth = await getOauthByService(user, 'google');
    let intra_auth = await getOauthByService(user, 'intra');
    console.log('[Envoi du Planning]');
    const calendar = google.calendar({version: 'v3', google_auth});
    var planning = [];
    await axios.get(`https://intra.epitech.eu/${intra_auth}/planning/load?format=json&start=${moment().format('YYYY-MM-DD')}&end=${moment().add(10, 'days').format('YYYY-MM-DD')}`).then(function (res) {
        for(const data of res.data) {
            if(data["event_registered"] == "registered") {
                planning.push({
                    start: data.start,
                    end: data.end,
                    title: data.type_title + ': ' + data.acti_title,
                    room: data.room.code
                });
            }
        }
    });
    for(const data of planning) {
        var event = {
            'summary': data.title,
            'location' : data.room,
            'start': {
                'dateTime': moment(data.start).format(),
                'timeZone': 'Europe/Paris',
            },
            'end': {
                'dateTime': moment(data.end).format(),
                'timeZone': 'Europe/Paris',
            },
            'reminders' : {
                'useDefault' : true
            }
        }
        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event,
        }, function(err, event) {
            if(err) {
                console.log(err);
                return;
            }
        });
    }
}
module.exports = {
    displayAbout
}
    
function displayAbout(req, res) {
    return {
        client: {
            host: req.ip
        },
        server: {
            current_time: Date.now(),
            services: [
                {
                    name: "google",
                    actions: [{
                        "name": "translate",
                        "description": "A string is given to translate",
                    }],
                    reactions: [{
                        "name": "send_message",
                        "description": "Send by discord direct message the result of the translation",
                    }]
                },
                {
                    name:"twitch",
                    actions: [{
                        "name": "stream_on",
                        "description": "Detect if streamer is live"
                    }, {
                        "name": "follower_milestone",
                        "description": "streamer reached followers milestone"
                    }],
                    reactions: [{
                        "name": "send_mail",
                        "description": "Send mail when streamer is live"
                    }]
                },
                {
                    name:"youtube",
                    actions: [{
                        "name": "new_video",
                        "description": "New video on specific channel"
                    }, {
                        "name": "follower_milestone",
                        "description": "User reached followers milestone"
                    }],
                    reactions: [{
                        "name": "send_mail",
                        "description": "send mail when new video"
                    }]
                },
                {
                    name:"Intra",
                    actions: [{
                        "name": "new_activity",
                        "description": "new activity user registered to"
                    }, {
                        "name": "gpa_update",
                        "description": "gpa updated"
                    }, {
                        "name": "credits",
                        "description": "credits updated"
                    }, {
                        "name": "netsoul_insufficient",
                        "description": "netsoul is insufficient based on limit given by the user"
                    }],
                    reactions: [{
                        "name": "send_mail",
                        "description": "send mail when some informations are updtaded"
                    }]
                },
                {
                    name:"weather",
                    actions: [{
                        "name": "weather_update",
                        "description": "weather updated"
                    }, {
                        "name": "ip_update",
                        "description": "ip updated"
                    }],
                    reactions: [{
                        "name": "send_mail",
                        "description": "send mail when weather is updated"
                    }]
                }, {
                    name:"news",
                    actions: [{
                        "name": "news_update",
                        "description": "New top news on specific domain"
                    }],
                    reactions: [{
                        "name": "send_mail",
                        "description": "send mail when news is updated"
                    }]
                }, {
                    name:"discord",
                    actions: [{
                        "name": "new_mention",
                        "description": "User get mentionned in a message"
                    }],
                    reactions: [{
                        "name": "send_mail",
                        "description": "Send mail when user get mentionned"
                    }]
                }, {
                     name: "Covid",
                        actions: [{
                            "name": "new_covid_update",
                            "description": "New covid update"
                        }],
                        reactions: [{
                            "name": "send_message",
                            "description": "Send message on discord giving new stats"
                        }]
                }, {
                    name: "Spotify",
                    actions: [{
                        "name": "new_trend",
                        "description": "New trend on Spotify"
                    }],
                    reactions: [{
                        "name": "send_mail",
                        "description": "Send mail giving new playlist"
                    }]
                }
            ]
        }
    }
}

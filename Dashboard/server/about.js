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
            services: [{
                name: "Weather",
                widget: [{
                    name: "Current weather",
                    description: "Get the current weather",
                    params: [{
                        name: "city",
                        type: "string"
                    }]
                }, {
                    name: "Forecast weather",
                    description: "Get the forecast weather",
                    params: [{
                        name: "city",
                        type: "string"
                    }, {
                        name: "day",
                        type: "int"
                    }]
                }, {
                    name: "Ip",
                    description: "Get the ip address",
                    params: null
                }]
            }, {
                name: "Riot",
                widget: [{
                    name: "Champions",
                    description: "Get info of a champion",
                    params: [{
                        name: "name",
                        type: "string"
                    }]
                }, {
                    name: "Items",
                    description: "Get info of an item",
                    params: [{
                        name: "name",
                        type: "string"
                    }]
                }]
            }, {
                name: "Youtube",
                widget: [{
                    name: "Channel info",
                    description: "Get the channel info of a user",
                    params: [{
                        name: "channel",
                        type: "string"
                    }]
                }, {
                    name: "Last subscriptions videos",
                    description: "Get the last videos of your subscriptions",
                    params: [{
                        name: "channel",
                        type: "string",
                    }, {
                        name: "max",
                        type: "int"
                    }, {
                        name: "order",
                        type: "string"
                    }]
                }]
            }, {
                name: "Github",
                widget: [{
                    name: "User repositories",
                    description: "Get the repositories of a user",
                    params: [{
                        name: "user",
                        type: "string"
                    }]
                }]
            }, {
                name: "Intra",
                widget: [{
                    name: "User info",
                    description: "Get the info of a user",
                    params: [{
                        name: "autologin",
                        type: "string"
                    }]
                }]
            }]  
        }
    }
}

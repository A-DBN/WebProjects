const express = require('express');
const path = require('path')
const cors = require('cors')
const app = express(),
port = process.env.PORT || 8080;
const axios = require('axios');

const youtube = require('./services/youtube/youtube');
const riot = require('./services/riot/riot');
// const reddit = require('./services/reddit/reddit');
const weather = require('./services/weather/weather');
const github = require('./services/github/github');
const about = require('./about');
const epitech = require('./services/intra/intra');

let token = null

app.use(cors())

app.get('/', (req, res) => {
    res.redirect('/v1/about.json');
});

// Riot

app.get('/v1/riot/item', (req, res) => {
    riot.getItem().then(item => {
        let response
        Object.values(item.data.data).forEach(element => {
            if (element.name === req.query.name)
                response = element
        })
        res.json({
            name: response.name,
            descriptions: response.plaintext,
            stats: response.stats,
            gold: response.gold,
        });
    }).catch(err => {
        res.json(err);
    });
})

app.get('/v1/riot/champion', (req, res) => {
    riot.getChampion(req.query.name).then(stats => {
        let datas = stats.data.data[req.query.name]
        res.send({
            name: datas.name,
            title: datas.title,
            nb_skins: datas.skins.length,
            lore: datas.lore,
            tags: datas.tags,
            stats: {
                hp: datas.stats.hp,
                mp: datas.stats.mp,
                armor: datas.stats.armor,
                spellblock: datas.stats.spellblock,
                attackdamage: datas.stats.attackdamage,
                attackrange: datas.stats.attackrange,
                attackspeed: datas.stats.attackspeed,
                crits: datas.stats.crit,
                spells : {
                    Q: {
                        name: datas.spells[0].name,
                        description: datas.spells[0].description,
                    },
                    W: {
                        name: datas.spells[1].name,
                        description: datas.spells[1].description,
                    },
                    E: {
                        name: datas.spells[2].name,
                        description: datas.spells[2].description,
                    },
                    R: {
                        name: datas.spells[3].name,
                        description: datas.spells[3].description,
                    }
                }
            }
        })
    }).catch(err => {
        res.send("No data found")
    })
}) //Pas totalement fonctionnel je vais repasser dessus

// Github

app.get('/v1/auth/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.github_id}&scope=repo`)
})

app.get('/v1/auth/github/callback', (req, res) => {
    const body = {
        client_id : process.env.github_id,
        client_secret: process.env.github_secret,
        code: req.query.code
    }
    const opts = {headers: {accept: 'application/json'}}
    axios.post(`https://github.com/login/oauth/access_token`, body, opts)
    .then(res => res.data['access_token'])
    .then(_token => {
        console.log('token=' + _token)
        token = _token
        res.redirect('/')
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

app.get('/v1/github/userRepository', (req, res) => {
    github.getUserRepository(req.query.user, req.query.type, req.query.per_page).then(repositories => {
        const repositorylist = []
        repositories.data.forEach(repository => {
            repositorylist.push({
                name: repository.name,
                full_name: repository.full_name,
                owner: repository.owner.login,
                owner_url: repository.owner.html_url,
                owner_avatar: repository.owner.avatar_url,
                language: repository.language,
                size: repository.size,
            })
        })
        res.send(repositorylist)
    }).catch(err => {
        res.send("No data found")
    })
})

// Reddit

app.post('/auth/reddit', (req, res) => {
    // reddit.connect().then(data => {
    //     res.send(data)
    // })
    res.send("Not implemented yet")
})

// Youtube

app.get('/v1/youtube/channel', (req, res) => {
    youtube.getChannelByName(req.query.channel).then(stats => {
        console.log(stats.data.items[0])
        res.send({
            subscribers: stats.data.items[0].statistics.subscriberCount,
            view_count: stats.data.items[0].statistics.viewCount,
            video_count: stats.data.items[0].statistics.videoCount,
            title: stats.data.items[0].snippet.title,
            thumbnail: stats.data.items[0].snippet.thumbnails.default.url,
            description: stats.data.items[0].snippet.description,
        })
    }).catch(err => {
        res.send(err)
    })
})

app.get('/v1/youtube/channel/videos', (req, res) => {
    youtube.getLastVideoByName(req.query.channel, parseInt(req.query.maxLimits), req.query.order).then(stats => {
        const videoList = []
        stats.data.items.forEach(video => {
            videoList.push({
                title: video.snippet.title,
                description: video.snippet.description,
                thumbnail: video.snippet.thumbnails.medium.url,
                channel_title: video.snippet.channelTitle,
                publish_time: video.snippet.publishTime,
            })
        })
        res.send(videoList)
    }).catch(err => {
        res.send("No data found")
    })
})

// Intra

app.get('/v1/intra/user', (req, res) => {
    epitech.getUser(req.query.autologin).then((response) => {
        console.log(response.data)
        res.send({
            name: response.data.title,
            login: response.data.login,
            picture: response.data.picture,
            scolaryear: response.data.scolaryear,
            promo: response.data.promo,
            course_code: response.data.course_code,
            student_year: response.data.student_year,
            city: response.data.groups[0].title,
            credits: response.data.credits,
            gpa: response.data.gpa[0].gpa,
            logtime: response.data.nsstat.active,
        })
    }).catch(err => {
        res.send("No data found")
    })
})

// Weather

app.get('/v1/weather/current', (req, res) => {
    weather.getCurrentWeatherByCity(req.query.city).then(weather => {
        let datas = weather.data
        const dates = new Date(datas.location.localtime).toISOString().split('T')[0].split('-')
        res.send({
            location: {
                city: datas.location.name,
                region: datas.location.region,
                country: datas.location.country,
                time: dates[2] + '/' + dates[1] + '/' + dates[0],
            },
            temperature: {
                last_updated: datas.current.last_updated,
                temp_c: datas.current.temp_c,
                temp_f: datas.current.temp_f,
                meteo: datas.current.condition.text,
                icon: datas.current.condition.icon,
            },
            conditions: {
                wind_kph: datas.current.wind_kph,
                precip_mm: datas.current.precip_mm,
                humility: datas.current.humidity,
                feelslike_c: datas.current.feelslike_c,
                feelslike_f: datas.current.feelslike_f,
            }
        })
    }).catch(err => {
        res.send("No data found")
    })
})

app.get('/v1/weather/forecast', (req, res) => {
    weather.getNextWeatherByCity(req.query.city).then(weather => {
        const weatherList = []
        weather.data.forecast.forecastday.forEach(day => {
            const dates = new Date(day.date).toISOString().split('T')[0].split('-')
            weatherList.push({
                date: dates[2] + '/' + dates[1] + '/' + dates[0],
                day: day.day,
                condition: day.day.condition.text,
                icon: day.day.condition.icon,
                max_temp_c: day.day.maxtemp_c,
                max_temp_f: day.day.maxtemp_f,
                min_temp_c: day.day.mintemp_c,
                min_temp_f: day.day.mintemp_f,
                avghumidity: day.day.avghumidity,
                uv : day.day.uv,
                totalprecip_mm: day.day.totalprecip_mm,
            })
        })
        res.send(weatherList)
    }).catch(err => {
        res.send("No data found")
    })
})

app.get('/v1/weather/ip', (req, res) => {
    weather.getIP().then(ip => {
        res.send(ip.data)
    }).catch(err => {
        res.send("No data found")
    })
})

// About

app.get('/v1/about.json',(req, res) => {
    res.send(about.displayAbout(req))
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on the port ${port}`);
});
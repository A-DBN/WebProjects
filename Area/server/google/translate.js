const translate = require('@vitalets/google-translate-api');

async function getTranslation(req, res) {
    return await translate(req.query.text, {to: req.query.to}).then( result => {
        return result.text
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {getTranslation}
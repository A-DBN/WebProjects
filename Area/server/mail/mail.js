const nodemailer = require("nodemailer");
const fs = require('fs');
const { channel } = require("diagnostics_channel");

var htmlstream = fs.createReadStream(__dirname + '/templates/index.html');

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: "genepiarea@gmail.com",
        pass: "JeanGenepi123"
    }
});

function getTemplate(type) {
    switch (type) {
        case 'twitch':
            return 'twitch.html'
        case 'youtube':
            return 'youtube.html'
        case 'twitter':
            return 'twitter.html'
    }
}

function sendMail(to, subject, text) {
    if (text) {
        var mailOptions = {
            from: "GenepiArea",
            to: to,
            subject: subject,
            text: text
        }
    } else {
        var mailOptions = {
            from: "GenepiArea",
            to: to,
            subject: subject,
            html: htmlstream
        };
    }
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error)
            console.log(error);
    });
}

module.exports = {sendMail}
const { Client, MessageEmbed } = require('discord.js');
const Mail = require('nodemailer/lib/mailer');
const client = new Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'] });
const env = require('dotenv').config()
const db = require('../firebase/database')
const mail = require('../mail/mail')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	} else {
        return ''
    }
}

client.on('messageCreate', async (message) => {
    let msg = message.content
    let users = await db.getDiscordUsers()
    let id = getUserFromMention(message.content)
    if (message.author.bot) return
    if (users.includes(id.id)) {
        await db.getUserByDiscordId(id.id).then((user) => {
            if (user.subscriptions.discord.actions.new_mention === true) {
                if (user.subscriptions.discord.user_id) {
                    mail.sendMail(user.email, `Discord: Nouvelle mention sur ${message.guild.name}`)
                }
            }
        })
    }
})

function sendResult(id, text, result, to) {
    let embed = new MessageEmbed()
    .setTitle(`Résultat de la traduction`)
    .setFooter(`Translation made by GenepiArea`)
    .addFields(
        { name: '`From:` ' + text, value: "`To:` " + result, inline: true },
        { name: 'Translate to', value: to, inline: true }
    )
    .setTimestamp()
    client.users.fetch(id).then(user => {
        user.send({content: 'ㅤ', embeds: [embed]}).catch((err) => {
            return 'Failed to send message'
        })
    })
}

function sendCovidResult(user, res) {
    let embed = new MessageEmbed()
    .setTitle(`Covid Tracker - ${res.reg}`)
    .addFields(
        { name: '`Hospitalisés:`', value: `${res.hosp}`, inline: true },
        { name: '`En Réanimation:`', value: `${res.rea}`, inline: true }
    )
    .setTimestamp()
    client.users.fetch(user.subscriptions.discord.user_id).then(user => {
        user.send({content: 'ㅤ', embeds: [embed]}).catch((err) => {
            return 'Failed to send message'
        })
    })
}

module.exports = { sendResult, sendCovidResult }

client.login(process.env.discord_token);
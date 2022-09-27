const Discord = require('discord.js')
const config = require("../config.js")
const request = require('request');
exports.run = async (bot, message, args, command, db) => {
    var date = new Date()
    var month
    if (date.getMonth() + 1 === 1) {
      month = "January"
    } else if (date.getMonth() + 1 === 2) {
      month = "February"
    } else if (date.getMonth() + 1 === 3) {
      month = "March"
    } else if (date.getMonth() + 1 === 4) {
      month = "April"
    } else if (date.getMonth() + 1 === 5) {
      month = "May"
    } else if (date.getMonth() + 1 === 6) {
      month = "June"
    } else if (date.getMonth() + 1 === 7) {
      month = "July"
    } else if (date.getMonth() + 1 === 8) {
      month = "August"
    } else if (date.getMonth() + 1 === 9) {
      month = "September"
    } else if (date.getMonth() + 1 === 10) {
      month = "October"
    } else if (date.getMonth() + 1 === 11) {
      month = "November"
    } else if (date.getMonth() + 1 === 12) {
      month = "December"
    }
  
    const embed = new Discord.EmbedBuilder()
    .setTitle(`ICW BOT`)
    .setAuthor({
      name: "ICW Donation Links",
      iconURL:`${config.icwflashlogo}`
    })
    .setColor("BLACK")
    .setDescription(`${config.d} ${config.o} ${config.n} ${config.a} ${config.t} ${config.e}
[paypal](https://www.paypal.com/paypalme2/icwbot)\n[patreon](https://www.patreon.com/icw)
paytm or google pay: || 7206263669 ||
its help me for making more better codes`)
    .setThumbnail(config.icwlogo)
    .setFooter({
      text: "Thanks " + message.author.username.toString(),
      iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})
    })
    .setImage(config.icwflahimg)
    .setTimestamp();
    message.channel.send({ embeds: [embed] });
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['don', 'donation'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'donate',
	category: 'useful',
	description: 'for getting donation links',
	usage: '$donate'
};
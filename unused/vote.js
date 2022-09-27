 const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  
  var infoembed = new Discord.MessageEmbed()
  .setAuthor("Hi " + message.author.username.toString(), message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
  //.setTitle("info")
  .setColor("RANDOM")
  .setDescription(`${config.v} ${config.o} ${config.t} ${config.e}
Hey! ${message.author.username} please help our bot icw with your vote \`\`(voting site's 👇)\`\`
[DBL](https://top.gg/bot/376292306233458688)
[Glenn](https://glennbotlist.xyz/bot/376292306233458688)
[DOB](https://bots.ondiscord.xyz/bots/376292306233458688)
`)
//[patreon](https://www.patreon.com/icw) | [paypal](https://www.paypal.com/paypalme2/icwbot)`)
  .setThumbnail(`${config.icwlogo}`)
  .setFooter(`${bot.user.username}™ | Developed by: PK#1650 `, `${config.pkflashlogo}`)
  .setImage(config.icwflahimg)
  .setTimestamp();
  message.channel.send({ embeds: [infoembed] });
}

exports.conf = {
	enabled: false,
	guildOnly: false,
	aliases: ['voting'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'vote',
	category: 'useful',
	description: 'for getting vote list\'s link',
	usage: '$vote'
};
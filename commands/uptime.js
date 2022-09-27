const Discord = require('discord.js');
const config = require("../config.js");
exports.run = async (bot, message, args, command, db) => {
  var days = Math.floor(bot.uptime / 86400000000000);
  var hours = Math.floor(bot.uptime / 3600000);
  var minutes = Math.floor((bot.uptime % 3600000) / 60000);
  var seconds = Math.floor(((bot.uptime % 360000) % 60000) / 1000);
  const uptimeembed = new Discord.EmbedBuilder()
  .setColor("BLACK")
  .setImage(config.icwflahimg)
  .setDescription(`**Uptime**
${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
  message.channel.send({ embeds: [uptimeembed] });
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['botuptime', 'bot-uptime'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'uptime',
	category: 'useful',
	description: 'for check bot uptime',
	usage: '$uptime'
};
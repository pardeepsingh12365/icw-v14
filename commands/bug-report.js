const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let args2 = args.join("").substring(9);
  if (!args2) return message.channel.send({content:`***plz add a bug message after command***`});
  message.channel.send({content:`***Report has been sent succesfully. thank you***`});
  bot.channels.cache.get(config.botbuglogchannel).send({content:`report by: **${message.author.tag}** (${message.author.id})\nbug: ${args2}`});
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['bugreport', 'bug-report','bug'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'bug-report',
	category: 'useful',
	description: 'for report any bug',
	usage: '$bug-report (message)'
};
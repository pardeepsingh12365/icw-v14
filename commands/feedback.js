const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let args2 = args.join("").substring(command.length);
  if (!args2) return message.channel.send({content:`***plz add a message after command***`});
  message.channel.send({content:`***Feedback has been sent succesfully. thank you***`});
  bot.channels.cache.get(config.botfeedbackchannel).send({content:`feedback by: **${message.author.tag}** (${message.author.id}) \nfeedback: ${args2}`});
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'feedback',
	category: 'useful',
	description: 'for send a feedback',
	usage: '$feedback (message)'
};
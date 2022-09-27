const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let args2 = args.join("").substring(command.length);
  if (!args2) return message.channel.send({content:`***plz add a message after command***`});
  message.channel.send({content:`***Suggestion has been sent succesfully. thank you***`});
  bot.channels.cache.get(config.botsuggestchannel).send({content:`suggest by: **${message.author.tag}** (${message.author.id}) \nsuggestion: ${args2}`});
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['suggest'],
	permLevel: 0,
  manu: false
};

exports.help = {
	name: 'suggestion',
	category: 'useful',
	description: 'for send a suggestion',
	usage: '$suggestion <message>'
};
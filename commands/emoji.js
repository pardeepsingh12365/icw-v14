const Discord = require('discord.js')
const config = require("../config.js")
const nodefetch = require('node-fetch');
exports.run = async (bot, message, args, command, db) => {
  let args2 = args.join("").substring(command.length);
	try {
    var emote;
    if (!args2) {
      let emotes = bot.emojis.cache.map(e => e)
      var a = Math.floor(Math.random() * emotes.length);
      emote = emotes[a]
    } else {
		  emote = bot.emojis.cache.find(e => e.name === args2);
    }
    if (!emote) return message.channel.send({content:"sorry but i have no emoji with this name in my collaction"})
		if (emote.animated === true) {
			const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`;
			const embed = new Discord.EmbedBuilder()
				.setColor("BLACK")
				.setImage(URL);
			message.channel.send({embed: [embed]})
		} else {
			const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`;
			const embed = new Discord.EmbedBuilder()
				.setColor("BLACK")
				.setImage(URL);
			message.channel.send({embeds: [embed]})
		}
	} catch (error) {
			message.reply('i got a error: '+ error +`\nyou can report to devloper with command \`\`${config.prefix}bugreport <your bug>\`\``);
	}
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['emote'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'emoji',
	category: 'fun',
	description: 'for getting awesome emojis with search',
	usage: '$emoji <emoji name>'
}; 
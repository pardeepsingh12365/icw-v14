const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => {
  const queue = bot.player.getQueue.get(message.guild.id);
  if (message.member.voice.channel === undefined) return message.channel.send({content: "Please join my voice channel first"});
  if (!message.guild.members.me.voice.channel) return message.channel.send({content:"bot is not in voice channel and nothing to play"}, { reply: message });
  if (!queue || !queue.playing) return message.channel.send({content:"There are no more songs"});
  await queue.back();
}

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: ['prev'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'previous',
	category: 'music',
	description: 'for play previos song',
	usage: '$previous'
}
const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => {
  const queue = bot.songQueue.get(message.guild.id);
  if (message.member.voice.channel) return message.channel.send({content:"⚠️ You can't use this command if you are not in my voice channel"});
  if (!message.guild.members.me.voice.channel) return message.channel.send({content:"bot is not in voice channel and nothing to play"}, { reply: message });
  if (queue.tracks.length < 0) return message.channel.send({comtent:"No more song"})
  const index = Math.floor(Math.random() * queue.tracks.length);
  queue.jump(index)
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['rand'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'random',
	category: 'music',
	description: 'for playing song randomly',
	usage: '$random'
}
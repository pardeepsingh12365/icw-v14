const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => {
  let queue = bot.player.getQueue(message.guild.id);
  if (!message.member.voice.channel) return message.channel.send({content: "⚠️ You can't resume music if you're not in a voice channel"});
  if (!message.guild.members.me.voice.channel) return message.channel.send({content:"⚠️ bot is not in voice channel and nothing to play"}, { reply: message });
  if (!queue) return message.channel.send({content: "⚠️ I'm not playing anything"});
  if (!queue.connection.paused) return message.channel.send({content: "Already playing"});
  if (queue.player) {
    queue.setPaused(false);
    return message.channel.send({content:`${config.r} ${config.e} ${config.s} ${config.u} ${config.m} ${config.e} ${config.d}\n▶ Resumed the music for you!`});
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['res'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'resume',
	category: 'music',
	description: 'for resume the music player',
	usage: '$resume'
}
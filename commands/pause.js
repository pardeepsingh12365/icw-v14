const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => {
  let queue = bot.player.getQueue(message.guild.id);
  if (!message.member.voice.channel) return message.channel.send({content: "⚠️ You can't pause music if you're not in my voice channel"});
  if (!message.guild.members.me.voice.channel) return message.channel.send({content:"⚠️ bot is not in voice channel and nothing to play"}, { reply: message });
  if (!queue) return message.channel.send({content:'There is nothing playing'});
  if (queue.connection.paused) return message.channel.send({content: ':warning: already paused'})
  if (queue.player) {
    queue.setPaused(true)
    return message.channel.send({content:`${config.p} ${config.a} ${config.u} ${config.s} ${config.e} ${config.d}\n⏸ Paused the music for you!`});
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['pau'],
	permLevel: 'No perm`ission need',
  manu: false
};

exports.help = {
	name: 'pause',
	category: 'music',
	description: 'for pause the music player',
	usage: '$pause'
}
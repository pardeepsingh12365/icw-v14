const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => {

  const queue = bot.player.getQueue(message.guild.id);
  if (!message.member.voice.channel) return message.channel.send({content:"⚠️ You can't use this command because you are not in my voice channel"});
  if (!message.guild.members.me.voice.channel) return message.channel.send({content:"bot is not in voice channel and nothing to play"}, { reply: message });
  if (!queue || !queue.playing) return message.channel.send({content:"i have no song in queue"});
  if (queue.tracks.length < 0) return message.channel.send({content: "There are no more song"});
  let arg = args.join("").substring(command.length);
  var index = Number.parseInt(arg);
  if (!Number.isInteger(index) || index-1 > queue.tracks.length) return message.channel.send({content: "⚠️ Invalid value you have entered"})
  queue.jump(index - 2)
}

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: ['go-to'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'goto',
	category: 'music',
	description: 'for playing direct song from queue',
	usage: '$goto <song number>'
}
const Discord = require('discord.js')
const config = require("../config.js")
const { 
  joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
  getVoiceConnection,
  Voice
} = require('@discordjs/voice');

exports.run = async (bot, message, args, command, db) => {
  let queue = bot.player.getQueue(message.guild.id);
  const connection = getVoiceConnection(message.guild.id)
  if (!message.member.voice.channel) return message.channel.send({content: "⚠️ You can't you this command if you are not in my voice channel"});
  if (!message.guild.members.me.voice.channel) return message.channel.send({content:"bot is not in voice channel and nothing to play"}, { reply: message });
  queue.skip();
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['next', 's'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'skip',
	category: 'music',
	description: 'for skip the current song',
	usage: '$skip'
}
const Discord = require('discord.js')
const config = require("../config.js")
//const player = require("../pkmain.js")
const { joinVoiceChannel, createAudioPlayer} = require('@discordjs/voice');
const Voice = require('@discordjs/voice');
exports.run = async (bot, message, args, command, db) => {
  const channel = message.member.voice.channel;
  const guildQueue = bot.player.getQueue(message.guild.id)
//  const player = createAudioPlayer()
  if(!channel) return message.reply('you are not in any voice channel')

  if(message.guild.members.cache.get(bot.user.id).permissions.has("CONNECT") == false) return message.channel.send({content:'I need `Connect` permission in order to execute this command!'})
  if(message.guild.members.cache.get(bot.user.id).permissions.has("SPEAK") == false) return message.channel.send({content:'I need `Speak` permission in order to execute this command!'})


  // const permission = channel.permissionFor(message.client.user);
  // if (!permission.has("CONNECT")) return message.channel.send(`i don't have permission to join your voice channel`)
  // if (!permission.has("SPEAK")) return message.channel.send(`i don't have permission to speak in your voice channel`)
  /*if (!bot.voice.connections.some(e => e.channel === message.member.voice.channel)) {
  channel.join()
    .then(connection => message.reply(' im conected').then(m => { m.react('✅'), m.delete({ timeout: 5000, reason: 'It had to be done.' })}))
    .catch(console.error);
  } else {
    message.reply(` im already in your voice channel`)
  }*/

 /*    if (!guildQueue)  {
      var queueConstruct = {
        player: player,
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: [],
        playing: true,
        currentSongIndex: 0,
        previousSongIndex: 0,
        shuffle: false,
        repeat: false,
        autoremove: false,
        reason: null,
        lnpmid: null
      }
      bot.songQueue.set(message.guild.id, queueConstruct);
    }*/
  
  
try {
  const connection = joinVoiceChannel({
          channelId: message.member.voice.channel.id,
          guildId: message.member.voice.channel.guild.id,
          adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
        })//.subscribe(player)

  connection
  message.channel.send({content: ' im conected'})
    //.then(m => { m.react('✅'), m.delete({ timeout: 5000, reason: 'It had to be done.' })})
} catch (error) {
  message.channel.send({content: ' join error '+error})
}
  
}

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: ['joinvoice', 'join-voice', 'joinvc', 'join-vc'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'join',
	category: 'music',
	description: 'join bot on your voice channel',
	usage: '$join'
};
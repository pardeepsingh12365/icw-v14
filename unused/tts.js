const Discord = require('discord.js')
const config = require("../config.js")
var googleTTS = require('google-tts-api');
exports.run = async (bot, message, args, command, db) => {
  let serverQueue = bot.songQueue.get(message.guild.id)
  let args2 = args.join('').substring(command.length);
  let ch = message.member.voice.channel
  if (!message.member.voice.channel) return message.channel.send({content:`you are not in any voice channel`})
  if (!args2[0]) return message.channel.send({content:`please add message after command like \`\`${config.prefix}tts yourmessage\`\``})
  if (serverQueue) {
    ch.join()
    message.channel.send({content:args2}, {tts: true}).then(msg => msg.delete())
  } else {
    ///ch.join()
    if (!ch) return;
     googleTTS(args2, 'en', 1)   // speed normal = 1 (default), slow = 0.24
       .then(async function (url) {
        await ch.join().then(async connection => {
          setTimeout(async function() {
          await connection.play(url, {bitrate: 192000, volume: 80 / 80 }); // https://translate.google.com/translate_tts?...
        }, 100)
        })
    }).catch(function (err) {
      message.channel.send({content:err.stack});
    });
  }

}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['-tts'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'tts',
	category: 'useful',
	description: 'bot saying your message',
	usage: '$tts message'
};
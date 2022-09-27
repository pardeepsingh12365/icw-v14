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

  let guildQueue = bot.player.getQueue(message.guild.id);
  const channel = message.member.voice.channel;
  
      if (message.member.voice.channel) {
            if (!message.guild.members.me.voice.channel) {
                message.channel.send({content:"bot is not in voice channel and nothing to play"}, { reply: message });
                return;
            }
          if (!message.guild.members.me.voice.channel && !message.guild.members.me.voice.channel.equals(message.member.voice.channel)) {
              message.reply(` you cant use this command because im not in your voice channel`)
          } else {
            //const connection = getVoiceConnection(message.guild.id)
            //if(!connection) return message.channel.send("I'm not in a voice channel!")
            if (guildQueue) {
                guildQueue.stop();
              //message.member.voice.channel.leave();
              var stopembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor("Finished playing by stop command", `${config.icwflashlogo}`)
                .setDescription("thanks for using see you soon bye bye 👋")
                .setFooter("Action by: " + message.author.username.toString(), message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                .setImage(config.icwflahimg)
                .setTimestamp();
                message.channel.send({ embeds: [stopembed] });
            } else {
                //message.member.voice.channel.leave();
              const connection = getVoiceConnection(message.guild.id);
              connection.destroy()
              message.channel.send({content:"im leaving now"})
              //.then(m => { m.react('✅'), m.delete({ timeout: 5000, reason: 'It had to be done.' })})
            }
          }

        } else {
            message.channel.send({content:"You can't use this command if you're not in a voice channel :cry:"}, { reply: message });
        }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['leavevoice', 'leave-voice', 'leavevc', 'leave-vc'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'leave',
	category: 'music',
	description: 'leave bot from your voice channel',
	usage: '$leave'
};
const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => {

  const serverQueue = bot.songQueue.get(message.guild.id);
  
        if (message.member.voiceChannel !== undefined) {
            if (serverQueue.autoremove) {
                serverQueue.autoremove = false;
                message.channel.send({content:"Song autoremoval is now disabled"}, { reply: message });
            } else {
                serverQueue.autoremove = true;
                message.channel.send({content:"Song autoremoval is now enabled"}, { reply: message });
            }
        } else {
            message.channel.send({content:"You can't hear my music if you're not in a voice channel :cry:"}, { reply: message });
        }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['auto-remove'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'autoremove',
	category: 'music',
	description: 'for switch the auto remove song',
	usage: '$autoremove'
}
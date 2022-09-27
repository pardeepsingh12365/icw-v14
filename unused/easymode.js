const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  const easymode = (await db.ref(`servers/${message.guild.id}`).child('easymode').once('value')).val();
  
  if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that.\npermission missing \`\`manage server\`\``});
    if (!easymode || easymode === false) {
      db.ref('servers/' + message.guild.id).update({
        easymode: true
      }).catch(function(err) {
        message.channel.send({content:err + "\n\n\n"});
      });
        message.channel.send({content:"easy mode (for control music with reaction button) is now enabled"});
    }
    if (easymode === true) {
      db.ref('servers/' + message.guild.id).update({
        easymode: false
      }).catch(function(err) {
        message.channel.send({content:err + "\n\n\n"});
      });
        message.channel.send({content:"easy mode (for control music with reaction button) is now disabled"});
      }
  
}

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: ['es','easy-mode', 'react-control', 'musiccontrol','musicbutton'],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'easymode',
	category: 'settings',
	description: 'for on/off easy-mode (for control music with reaction button) in your server(in now-playing)',
	usage: '$easymode'
}
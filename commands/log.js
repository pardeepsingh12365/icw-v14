const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (!message.member.permissions.has('MANAGE_GUILD')) {
    return message.channel.send({content:`you dont have permission to do that.\npermission missing \`\`manage server\`\``})
  }
  const logchannelid = (await db.ref(`servers/${message.guild.id}`).child('logchannelid').once('value')).val();
  const logswitch = (await db.ref(`servers/${message.guild.id}`).child('logswitch').once('value')).val();
  
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "on" || c === "enable") {
     if (!logchannelid || logchannelid === null) {
       return message.channel.send({content:`please set log channel first with command \`\`${config.prefix}log set-channel #channel\`\``})
     }
    db.ref('servers/' + message.guild.id).update({
      logswitch: true
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`mod-log is  turned **on** for ${message.guild.name} server`})
  } else if (c === "off" ||c === "disable") {
    db.ref('servers/' + message.guild.id).update({
      logswitch: false
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`logs is  turned **off** for ${message.guild.name} server`})
  } else if (c === "setchannel" || c === "set-channel") {
    let logch = message.mentions.channels.first()
    if (!logch) return message.channel.send({content:`please mention a channel after command like \`\`${config.prefix}log set-channel #general\`\``})
    db.ref('servers/' + message.guild.id).update({
      logchannelid: logch.id
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`mod-log channel set succesfully **${logch.name}** for **${message.guild.name}** server`})
  } else { 
    var embed = new Discord.MessageEmbed()
      .setAuthor("ICW WELCOME CONTROL",`${config.icwflashlogo}`)
      .setDescription(`${config.m} ${config.o} ${config.d} ${config.l} ${config.o} ${config.g}
:black_square_button: | \`\`log on/off\`\` welcome switch
      \n:black_square_button: | \`\`log set-channel #channel\`\` set channel for welcome
      \n
      \n:black_square_button: | mod-log main switch is **${logswitch ? "on" : "off"}**
      \n:black_square_button: | mod-log channel is **${logchannelid ? `<#${logchannelid}>`: "Not Set"}**`)
      .setImage(config.icwflahimg)
      .setFooter(`${bot.user.username}™ | Developed by: PK#1650 `, `${config.pkflashlogo}`)
      .setColor("RANDOM")
      .setTimestamp();

    message.channel.send({embeds: [embed]})
  }
  
}

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: ['logs', 'modlog', 'mod-log'],
	permLevel: 2,
  manu: false
};

exports.help = {
	name: 'log',
	category: 'modration',
	description: 'for set-up mod-logs in your server',
	usage: '$log on/off/set-channel'
}
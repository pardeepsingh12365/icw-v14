const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (message.author.id !== config.botowner && !message.member.permissions.has('MANAGE_GUILD')) {
    return message.channel.send({content:`you dont have permission to do that.\npermission missing \`\`manage server\`\``})
  }
  const npmsg = (await db.ref(`servers/${message.guild.id}`).child('npmsg').once('value')).val();
  const npmsgch = (await db.ref(`servers/${message.guild.id}`).child('npmsgch').once('value')).val();
  
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "on" || c === "enable") {
    db.ref('servers/' + message.guild.id).update({
      npmsg: true
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`now-playing message is turned **on** for ${message.guild.name} server in ${npmsgch ? `<#${npmsgch}>` : 'default channel'}`})
  } else if (c === "off" ||c === "disable") {
    db.ref('servers/' + message.guild.id).update({
      npmsg: false
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`now-playing message is turned **off** for ${message.guild.name} server`})
  } else if (c === "set-channel" || c === "setchannel" || c === "set" || c === "channel") {
    let arg2 = arg.substring(c.length);
    let ch = message.mentions.channels.first()
    if (!ch) return message.channel.send({content:`please add a channel after command\nlike \`\`${config.prefix}npmessage set-channel (@channel)\`\``})
    db.ref('servers/' + message.guild.id).update({
      npmsgch: ch.id
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`now-playing message channel set succesfully <#${ch.id}> for **${message.guild.name}** server`})
  } else if (c === "reset" ||c === "delete") {
    db.ref('servers/' + message.guild.id).child("npmsg").remove().catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    db.ref('servers/' + message.guild.id).child("npmsgch").remove().catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`now-playing message is reseted succesfully for ${message.guild.name} server`})
  } else { 
    var embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: "ICW NP-MESSAGE CONTROL",
        iconURL: `${config.icwflashlogo}`
      })
      .setDescription(`:black_square_button: | \`\`npmessage on/off\`\` now-playing message switch
      \n:black_square_button: | \`\`npmessage set-channel (@channel)\`\` set channel for now-playing message
      \n:black_square_button: | \`\`npmessage reset\`\` reset setting for now-playing message
      \n
      \n:black_square_button: | now-playing message main switch is : **${npmsg ? "on" : "off"}**
      \n:black_square_button: | now-playing channel is : **${npmsgch ? `<#${npmsgch}>` : 'default channel'}**`)
      .setImage(config.icwflahimg)
      .setFooter({
        text: `${bot.user.username}™ | Developed by: PK#1650 `,
        iconURL: `${config.pkflashlogo}`})
      .setColor("BLACK")
      .setTimestamp();

    message.channel.send({embeds: [embed]})
  }
  
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['npmsg','np-msg', 'np-message',],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'npmessage',
	category: 'settings',
	description: 'for set-up now-playing message in your server',
	usage: '$npmessage on\n$npmessage off\n$npmmessage set-channel (@channel)\n$npmessage reset'
}
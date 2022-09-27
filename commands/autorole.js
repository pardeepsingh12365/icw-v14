const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (message.author.id !== config.botowner && !message.member.permissions.has('MANAGE_GUILD')) {
    return message.channel.send({content:`you dont have permission to do that.\npermission missing \`\`manage server\`\``})
  }
  const autorole = (await db.ref(`servers/${message.guild.id}`).child('autorole').once('value')).val();
  const arrole = (await db.ref(`servers/${message.guild.id}`).child('arrole').once('value')).val();
  
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "on" || c === "enable") {
    if (!arrole || arrole === null) return message.channel.send({content:`please set auto-role first with command \`\`${config.prefix}autorole set-role @role\`\``})
    db.ref('servers/' + message.guild.id).update({
      autorole: true
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`auto-role is turned **on** for ${message.guild.name} server`})
  } else if (c === "off" ||c === "disable") {
    db.ref('servers/' + message.guild.id).update({
      autorole: false
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`auto-role is turned **off** for ${message.guild.name} server`})
  } else if (c === "set-role" || c === "setrole" || c === "set" || c === "role") {
    let arg2 = arg.substring(c.length);
    let role = message.mentions.roles.first()
    if (!role) return message.channel.send({content:`please add a role after command\nlike \`\`${config.prefix}autorole set-role @role\`\``})
    let botRolePosition = message.guild.member(bot.user).roles.highest.position;
    let rolePosition = role.position;
    if (botRolePosition <= rolePosition) return message.channel.send({content:`<@${message.author.id}> The role that you are trying to set is equal or higher than my role`})
    db.ref('servers/' + message.guild.id).update({
      arrole: role.id
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`auto-role role set succesfully **${role}** for **${message.guild.name}** server`})
  } else { 
    var embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: "ICW AUTO-ROLE CONTROL",
        iconURL: `${config.icwflashlogo}`
      })
      .setDescription(`${config.a} ${config.u} ${config.t} ${config.o} ${config.r} ${config.o} ${config.l} ${config.e}
:black_square_button: | \`\`autorole on/off\`\` auto-role switch
      \n:black_square_button: | \`\`autorole set-role @role\`\` set role for auto-role
      \n
      \n:black_square_button: | autorole main switch is **${autorole ? "on" : "off"}**
      \n:black_square_button: | autorole role is **${arrole ? `<@&${arrole}>`: "No Role"}**`)
      .setImage(config.icwflahimg)
      .setFooter({
        text: `${bot.user.username}™ | Developed by: PK#1650 `,
        iconURL: `${config.pkflashlogo}`
      })
      .setColor("BLACK")
      .setTimestamp();

    message.channel.send({embeds: [embed]})
  }
  
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['ar', 'auto-role', 'welcomerole'],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'autorole',
	category: 'settings',
	description: 'for set-up auto role for new members in your server',
	usage: '$autorole on\n$autorole off\n$autorole set-role @role'
}
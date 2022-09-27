const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (!message.member.permissions.has('MANAGE_GUILD')) {
    return message.channel.send({content:`you dont have permission to do that.\npermission missing \`\`manage server\`\``})
  }
  const defvolume = (await db.ref(`servers/${message.guild.id}`).child('defvolume').once('value')).val();
  
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "reset" || c === "delete") {
    db.ref('servers/' + message.guild.id).child("defvolume").remove().catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`default volume is reseted for ${message.guild.name} server\nnow default volume is 80%`})
  } else if (c === "offfff" ||c === "disablefff") {
    db.ref('servers/' + message.guild.id).update({
      defvolume: 200
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`defult volume is now **200**% for ${message.guild.name} server`})
  } else if (c === "set" || c === "set-volume" || c === "set-vol" || c === "setvol" || c === "setvolume" || c === "change") {
    let arg2 = arg.substring(c.length);
    let lt = parseInt(arg2)
    if (!lt || lt < 0 || lt > 100 || isNaN(lt)) return message.channel.send({content:`please add a correct time in 0 to 100. after command\nlike \`\`${config.prefix}defvolume set 100\`\``})
    db.ref('servers/' + message.guild.id).update({
      defvolume: lt
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`default volume set succesfully **${parseInt(lt)}**% for **${message.guild.name}** server`})
  } else { 
    var embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: "ICW DEFAULT VOLUME CONTROL",
        iconURL:`${config.icwflashlogo}`
      })
      .setDescription(`${config.d} ${config.e} ${config.f} ${config.v} ${config.o} ${config.l} ${config.u} ${config.m} ${config.e}
:black_square_button: | \`\`defvolume set (volume)\`\` set guilds default volume
      \n:black_square_button: | \`\`defvolume reset\`\` reset your guild default volume
      \n
      \n:black_square_button: | current default volume is **${defvolume ? `<#${defvolume}>`: "80"}%**`)
      .setImage(config.icwflahimg)
      .setFooter({
        text:`${bot.user.username}™ | Developed by: PK#1650 `,
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
	aliases: ['df', 'defvolume', 'def-volume','defualt-volume', 'customvolume'],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'defaultvolume',
	category: 'settings',
	description: 'for set-up default volume in your server',
	usage: '$defaultvolume\n$adefaultvolume set (volume in 1 to 100)\n$defaultvolume reset'
}
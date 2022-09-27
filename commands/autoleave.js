const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (message.author.id !== config.botowner && !message.member.permissions.has('MANAGE_GUILD')) {
    return message.channel.send({content:`you dont have permission to do that.\npermission missing \`\`manage server\`\``})
  }
  const autoleave = (await db.ref(`servers/${message.guild.id}`).child('autoleave').once('value')).val();
  const altime = (await db.ref(`servers/${message.guild.id}`).child('altime').once('value')).val();
  
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "on" || c === "enable") {
    db.ref('servers/' + message.guild.id).update({
      autoleave: true
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`voice channel auto-leave is  turned **on** for ${message.guild.name} server`})
  } else if (c === "off" ||c === "disable") {
    db.ref('servers/' + message.guild.id).update({
      autoleave: false
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`voice channel auto-leave is  turned **off** for ${message.guild.name} server`})
  } else if (c === "set-time" || c === "settime" || c === "time") {
    let arg2 = arg.substring(c.length);
    let lt = parseInt(arg2)
    if (!lt || lt < 0 || lt > 600 || isNaN(lt)) return message.channel.send({content:`please add a correct time in 0 to 600sec. after command\nlike \`\`${config.prefix}autoleave set 200\`\``})
    db.ref('servers/' + message.guild.id).update({
      altime: lt * 1000
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`auto voice channel leave time set succesfully **${parseInt(lt)}**sec for **${message.guild.name}** server`})
  } else { 
    var embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: "ICW VC AUTOLEAVE CONTROL",
        iconURL: `${config.icwflashlogo}`
      })
      .setDescription(`${config.a} ${config.u} ${config.t} ${config.o} ${config.l} ${config.e} ${config.a} ${config.v} ${config.e}
:black_square_button: | \`\`autoleave on/off\`\` autoleave vc switch
      \n:black_square_button: | \`\`autoleave set-time time\`\` set time for autoleave vc
      \n
      \n:black_square_button: | autoleave main switch is **${autoleave ? "on" : "off"}**
      \n:black_square_button: | autoleave time is **${altime ? `${altime / 1000}sec`: "defualt time 120sec."}**`)
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
	enabled: false,
	guildOnly: true,
	aliases: ['al', 'auto-leave', 'autodisconnect'],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'autoleave',
	category: 'settings',
	description: 'for set-up auto leave voice channel in your server',
	usage: '$autoleave on\n$autoleave off\n$autoleave set (time)'
}
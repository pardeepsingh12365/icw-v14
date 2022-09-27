const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (message.author.id !== config.botowner && !message.member.permissions.has('MANAGE_GUILD')) {
    return message.channel.send({content:`you dont have permission to do that.\npermission missing \`\`manage server\`\``})
  }
  const songselection = (await db.ref(`servers/${message.guild.id}`).child('songselection').once('value')).val();
  const songlistlimit = (await db.ref(`servers/${message.guild.id}`).child('songlistlimit').once('value')).val();
  
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "on" || c === "enable") {
    db.ref('servers/' + message.guild.id).update({
      songselection: true
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`song selection menu is  turned **on** for ${message.guild.name} server`})
  } else if (c === "off" ||c === "disable") {
    db.ref('servers/' + message.guild.id).update({
      songselection: false
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`song selection menu is  turned **off** for ${message.guild.name} server`})
  } else if (c === "list" || c === "setlimit" || c === "set-limit" || c === "limit") {
    let arg2 = arg.substring(c.length);
    let lt = parseInt(arg2)
    if (!lt || lt < 2 || lt > 10 || isNaN(lt)) return message.channel.send({content:`please add a correct value in 2 to 10. after command\nlike \`\`${config.prefix}songselect setlimit 5\`\``})
    db.ref('servers/' + message.guild.id).update({
      songlistlimit: lt
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`song selection list set succesfully **${parseInt(lt)}** for **${message.guild.name}** server`})
  } else { 
    var embed = new Discord.MessageEmbed()
      .setAuthor("ICW SONG SELECTION CONTROL",`${config.icwflashlogo}`)
      .setDescription(`${config.s} ${config.o} ${config.n} ${config.g} ${config.s} ${config.e} ${config.l} ${config.e} ${config.c} ${config.t}
:black_square_button: | \`\`songselect on/off\`\` song selection switch
      \n:black_square_button: | \`\`songselect set-liimit 2/10\`\` set list limit for song selection
      \n
      \n:black_square_button: | song selection menu switch is **${songselection ? "on" : "off"}**
      \n:black_square_button: | song selection limit is **${songlistlimit ? `${songlistlimit} songs`: "defualt is 5 songs."}**`)
      .setImage(config.icwflahimg)
      .setFooter(`${bot.user.username}™ | Developed by: PK#1650 `, `${config.pkflashlogo}`)
      .setColor("RANDOM")
      .setTimestamp();

    message.channel.send({embeds: [embed]})
  }
  
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['songselection'],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'songselect',
	category: 'settings',
	description: 'for set-up auto choose song when play from youtube ``(with play command)``',
	usage: '$songselect on\n$songselect off'
}
const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  const autoplay = (await db.ref(`users/${message.author.id}`).child('autoplay').once('value')).val();
  const apch = (await db.ref(`users/${message.author.id}`).child('apch0').once('value')).val();
  const apch2 = (await db.ref(`users/${message.author.id}/apch`).child('apch2').once('value')).val();
  const apsong = (await db.ref(`users/${message.author.id}`).child('apsong').once('value')).val();

  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "on" || c === "enable") {
    db.ref('users/' + message.author.id).update({
      autoplay: true
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`auto-play is turned **on** for you`})
  } else if (c === "off" ||c === "disable") {
    db.ref('users/' + message.author.id).update({
      autoplay: false
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`auto-play is turned **off** for you`})
  } else if (c === "set-channel" || c === "setchannel" || c === "channel") {
    let arg2 = arg.substring(c.length + 1);
    let ch = message.mentions.channels.first() || message.guild.channels.cache.get(arg2) || message.guild.channels.cache.find(c => c.name === arg2)
    if (!ch) return message.channel.send({content:`please add a voice-channel after command\nlike \`\`${config.prefix}autoplay set-channel (channel)\`\`\nyou can save 10 channels`})
    if (ch.type !== "GUILD_VOICE") return message.channel.send({content:`that is not a voice-channel`})
    
    let chnl;
    if (apch) {
      if (apch.split(" ").length > 10) return message.channel.send({content:`you can save only 10 channels`})
      if (await apch.includes(ch.id)) {
        if (apch.split(" ").length > 1) {
          chnl = apch.replace(` ${ch.id}`,"")
        } else {
          chnl = apch.replace(`${ch.id}`,"")
        }
        message.channel.send({content:`auto-play channel removed succesfully **${ch}** for you`})
      } else {
        chnl = apch.replace(apch,apch + " " + ch.id)
        message.channel.send({content:`auto-play channel added succesfully **${ch}** for you\nif you want to remove this channel do this command again with same channel`})
      }
    } else {
      chnl = ch.id
      message.channel.send({content:`auto-play channel added succesfully **${ch}** for you\nif you want to remove this channel do this command again with same channel`})
    }
    db.ref('users/' + message.author.id).update({
      apch0: chnl
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
  } else if (c === "set-song" || c === "setsong" || c === "song") {
    let arg2 = arg.substring(c.length + 1);
    if (!arg2) return message.channel.send({content:`please add a song after command`});
        
    
    db.ref('users/' + message.author.id).update({
      apsong: arg2
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`auto-play song set succesfully **${arg2}** for you`})
  } else { 
    var embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: "ICW AUTO-PLAY CONTROL",
        iconURL: `${config.icwflashlogo}`
      })
      .setDescription(`${config.a} ${config.u} ${config.t} ${config.o} ${config.p} ${config.l} ${config.a} ${config.y}
${message.author.tag}\n\n:black_square_button: | \`\`autoplay on/off\`\` auto-play switch
      \n:black_square_button: | \`\`autoplay set-channel (channel)\`\` set channel for auto-play\nyou can save 10 channels
      \n:black_square_button: | \`\`autoplay set-song (song or radio)\`\` set song for auto-play
      \n
      \n:black_square_button: | autoplay main switch is **${autoplay ? "on" : "off"}**
      \n:black_square_button: | autoplay song is **${apsong ? `${apsong}`: "No Song"}**
      \n:black_square_button: | autoplay channels is **${apch ? `${apch}`: "No Channel"}**`)
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
	aliases: ['ap', 'auto-play'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'autoplay',
	category: 'music',
	description: 'for playsong automatic',
	usage: '$autoplay on\n$autoplay off\n$autoplay set-channel (@channel)\nyou can set 10 channels\n$autoplay set-song (song)'
}

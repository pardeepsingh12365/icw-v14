const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let arg = args.join("").substring(command.length);
  let muser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.id === arg.split(" ")[0]) || message.guild.members.cache.find(m => m.user.username === arg.split(" ")[0])
  let arg2 = arg.split(arg.split(/ +/g).shift()).join().substring(2);
  let time = arg2.trim().split(/ +/g).shift().toLowerCase();
  let args3 = arg2.split(" ").splice(1).join(" ");
  let reason = args3 ? args3 : "No reason"
  if (!message.guild.members.me.permissions.has("MANAGE_ROLES")) return message.channel.send({content:`I don't have permission to do that`});
  if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_ROLES")) return message.channel.send({content:`U don't have permission to do that`});
  if (!muser) return message.channel.send({content:`Specify a user to mute`});
  if (muser.communicationDisabledUntil) return message.channel.send({content:'user is already muted'})

  let t = `${parseInt(time)}`
  let tt = time.substring(t.length,time.length)
  if (isNaN(t) || !t || !tt || !time) return message.channel.send(`:warning: You must specify a number as time, like \`\`${config.prefix}mute @mention 7hour\`\``);
  var finaltime;
  if (tt === "seconds" || tt === "sec" || tt === "s") {
    finaltime = t * 1000;
  }
  if (tt === "minutes" || tt === "min" || tt === "m") {
    finaltime = t * 60000;
  }
  if (tt === "hours" || tt === "hour" || tt === "h") {
    finaltime = t * 3600000;
  }
  if (tt === "days" || tt === "day" || tt === "d") {
    finaltime = t * 86400000;
  }
  if (tt === "weeks" || tt === "week" || tt === "w") {
    finaltime = t * 604800000;
  }
  if (!finaltime || isNaN(finaltime)) return message.channel.send({content: `:warning: Invalid time value`})
  if (finaltime > 2.4192e9) return message.channel.send({content: `:warning: Invalid time limit: you can provide maximum 28days timeout`})

  var timeoutembed = new Discord.EmbedBuilder()
    .setColor("BLACK")
    .setAuthor({
      name: "Action by : " + message.author.tag.toString(),
      iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})
    })
    .setDescription(`${config.m} ${config.u} ${config.t} ${config.e} ${config.d}\n
**Action**: Mute \n**Mamber**: ${muser.user.tag} (${muser.id}) \n**Time**: ${time} \n**Reason**: ${reason}`) 
    .setImage(config.icwflahimg)
    .setFooter({
      text: `${bot.user.username}™ | Developed by: PK#1650 `,
      iconURL: `${config.pkflashlogo}`
    })
    .setTimestamp();
  
  muser.disableCommunicationUntil(Date.now() + (finaltime), `${reason}`)
  .then( message.channel.send({embeds: [timeoutembed] }))
  .catch(console.error);

    const logswitch = (await db.ref(`servers/${message.guild.id}`).child('logswitch').once('value')).val();
    const logchannelid = (await db.ref(`servers/${message.guild.id}`).child('logchannelid').once('value')).val();
    if (logswitch) {
      let logch = message.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
      } else {
        logch.send({ embeds: [timeoutembed] })
      }
      
    }
    muser.send({content:`**You has been Muted from** ${message.guild} for ${time}. \n**Reason**: ${reason}`}).catch(err => {})
  
}

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: ['timeout'],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'mute',
	category: 'modration',
	description: 'for timeout someone',
	usage: '$mute @user reason'
} 
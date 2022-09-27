const Discord = require('discord.js');
const config = require("../config.js");
module.exports = async (bot, db, message, newmessage) => {
  const logswitch = (await db.ref(`servers/${message.guild.id}`).child('logswitch').once('value')).val();
  const logchannelid = (await db.ref(`servers/${message.guild.id}`).child('logchannelid').once('value')).val();

  if (message.author.bot) return;
  if (logswitch) {
      let logch = message.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
      } else {
        const editembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("Message Edited " + message.author.tag.toString(), newmessage.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setDescription(`Message sent by ${message.author} edited in ${message.channel}\n\n`)
        .addField('Old Message:', '`' + message.content + '`')
        .addField('New Message:', '`' + newmessage.content + '`')
        .setThumbnail(newmessage.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setImage(config.icwflahimg)
        .setFooter(`${bot.user.username}™ | Developed by: PK#1650 `, `${config.pkflashlogo}`)
        .setTimestamp();
        logch.send({ embed: editembed })
      }
  }
};
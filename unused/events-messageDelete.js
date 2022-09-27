const Discord = require('discord.js');
const config = require("../config.js");

module.exports = async (bot, db, message) => {
  const logswitch = (await db.ref(`servers/${message.guild.id}`).child('logswitch').once('value')).val();
  const logchannelid = (await db.ref(`servers/${message.guild.id}`).child('logchannelid').once('value')).val();
  if (!message) return;
  if (!message.author) return;
  if (message.author.bot) return;
  if (!message.guild.member(bot.user).hasPermission("MANAGE_GUILD")) return;
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
  const user = entry.executor;

  if (logswitch) {
      let logch = message.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
      } else {
        const deleteembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor("Message Deleted by " + user.tag.toString(), user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setDescription(`Message sent by ${message.author} deleted in ${message.channel}\n\n`)
        .addField('Message:', '`' + message.content + '`')
        .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setImage(config.icwflahimg)
        .setFooter(`${bot.user.username}™ | Developed by: PK#1650 `, `${config.pkflashlogo}`)
        .setTimestamp();
        logch.send({ embed: deleteembed })
      }
  }
};
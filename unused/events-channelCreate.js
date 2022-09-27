const Discord = require('discord.js');
const config = require("../config.js")

module.exports = async (bot, db, channel) => {
  const logswitch = (await db.ref(`servers/${channel.guild.id}`).child('logswitch').once('value')).val();
  const logchannelid = (await db.ref(`servers/${channel.guild.id}`).child('logchannelid').once('value')).val();
  if (!channel.guild.member(bot.user).hasPermission("MANAGE_GUILD")) return;

  const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  let user = '';
  if (entry.createdTimestamp > (Date.now() - 5000)) {
    user = entry.executor;
  } else {
    user = message.author;
  }
  const channelCreated = new Discord.MessageEmbed()
    .setAuthor(`${channel.guild.name}`, channel.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
    .setDescription(`**Channel created: ${channel}\nType: ${channel.type}**`)
    .setColor("RANDOM")
    .setImage(config.icwflahimg)
    .setFooter(`By ${user.username}#${user.discriminator}`, user.avatarURL)
    .setTimestamp();

  if (logswitch) {
  let logch = channel.guild.channels.cache.get(logchannelid);
    if (!logch) {
      return undefined;
    } else {
      logch.send({ embed: channelCreated })
    }
  }
};
const Discord = require('discord.js');
const config = require("../config.js")


module.exports = async (bot, db, oldMember, newMember) => {
  const logswitch = (await db.ref(`servers/${oldMember.guild.id}`).child('logswitch').once('value')).val();
  const logchannelid = (await db.ref(`servers/${oldMember.guild.id}`).child('logchannelid').once('value')).val();
  if (!oldMember.guild.member(bot.user).hasPermission("MANAGE_GUILD")) return;

  const entry = await oldMember.guild.fetchAuditLogs({type: 'MEMBER_UPDATE'}).then(audit => audit.entries.first());
  const user = entry.executor;

  const entryRoles = await oldMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
  const userRoles = entryRoles.executor;
  // if (entry.extra.channel.id === oldMember.channel.id
  // if (entry.target.id === entry.author.id
  //     if (entry.createdTimestamp > (Date.now() - 5000)) {
  //   user = entry.executor
  // } else {
  //   user = oldMember.author
  // }

  if (oldMember.roles === newMember.roles) return;
  if (oldMember.roles === newMember.roles && (oldMember.nickname === newMember.nickname)) return;

  if (oldMember.roles !== newMember.roles && (oldMember.nickname === newMember.nickname)) {

    const addedR = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id)).first();
    const removedR = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id)).first();
    if (oldMember.roles.size !== newMember.roles.size) {
      if (oldMember.roles.size > newMember.roles.size) {
        const removedRole = removedR.name;
        const remembed = new Discord.MessageEmbed()
          .setAuthor('Member Updated ' + newMember.user.tag.toString(), newMember.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setDescription(`${newMember} removed from ${removedR}`)
          .setColor("RANDOM")
          .setImage(config.icwflahimg)
          .setFooter(`By ${userRoles.username}#${userRoles.discriminator}`, userRoles.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setTimestamp();
        if (logswitch) {
          let logch = oldMember.guild.channels.cache.get(logchannelid);
          if (!logch) {
            return undefined;
          } else {
            logch.send({ embed: remembed })
          }
        }
      } else if (oldMember.roles.size < newMember.roles.size) {
        const addedRole = addedR.name;
        const addembed = new Discord.MessageEmbed()
          .setAuthor('Member Updated ' + newMember.user.tag.toString(), newMember.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setDescription(`${newMember} added to ${addedR}`)
          .setColor("RANDOM")
          .setImage(config.icwflahimg)
          .setFooter(`By ${userRoles.username}#${userRoles.discriminator}`, userRoles.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setTimestamp();
        if (logswitch) {
          let logch = oldMember.guild.channels.cache.get(logchannelid);
          if (!logch) {
            return undefined;
          } else {
            logch.send({ embed: addembed })
          }
        }
      }
    }
    const memberUpdated = new Discord.MessageEmbed()
      .setAuthor('Member Updated ' + newMember.user.tag.toString(), newMember.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
      .setDescription(`${newMember}`)
      .setColor("RANDOM")
      .setImage(config.icwflahimg)
      .addField('Before:', oldMember.roles.cache.map(e => e).join(','))
      .addField('After:', newMember.roles.cache.map(e => e).join(','))
      .setFooter(`By ${userRoles.username}#${userRoles.discriminator}`, userRoles.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
      .setTimestamp();
    if (logswitch) {
      let logch = oldMember.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
      } else {
        logch.send({ embed: memberUpdated })
      }
    }
  } else {

    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {

        const memberUpdated = new Discord.RichEmbed()
          .setAuthor('Nickname Changed ' + newMember.user.tag.toString(), newMember.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setDescription(`❯ ${newMember}\n❯ **Before:** None\n❯ **After:** ${newMember.nickname}`)
          .setColor("RANDOM")
          .setImage(config.icwflahimg)
          .setFooter(`By ${user.username}#${user.discriminator}`, user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setTimestamp();
        if (logswitch) {
          let logch = oldMember.guild.channels.cache.get(logchannelid);
          if (!logch) {
            return undefined;
          } else {
            logch.send({ embed: memberUpdated })
          }
        }
      } else if (newMember.nickname === null) {

        const nickUpdated = new Discord.MessageEmbed()
          .setAuthor('Nickname Changed ' + newMember.user.tag.toString(), newMember.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setDescription(`❯ ${newMember}\n❯ **Before:** ${oldMember.nickname}\n❯ **After:** None`)
          .setColor("RANDOM")
          .setImage(config.icwflahimg)
          .setFooter(`By ${user.username}#${user.discriminator}`, user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setTimestamp();

        if (logswitch) {
        let logch = oldMember.guild.channels.cache.get(logchannelid);
          if (!logch) {
            return undefined;
          } else {
            logch.send({ embed: nickUpdated })
          }
        }

      } else {

        const memberUpdated = new Discord.MessageEmbed()
          .setAuthor('Nickname Changed ' + newMember.user.tag.toString(), newMember.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setDescription(`❯ ${newMember}\n❯ **Before:** ${oldMember.nickname}\n❯ **After:** ${newMember.nickname}`)
          .setColor("RANDOM")
          .setImage(config.icwflahimg)
          .setFooter(`By ${user.username}#${user.discriminator}`, user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setTimestamp();

        if (logswitch) {
          let logch = oldMember.guild.channels.cache.get(logchannelid);
          if (!logch) {
            return undefined;
          } else {
            logch.send({ embed: memberUpdated })
          }
        }
      }

    }
  }

};
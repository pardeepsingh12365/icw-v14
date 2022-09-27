const Discord = require('discord.js');
const config = require("../config.js");
module.exports = async (bot, db, member) => {
    const wc = (await db.ref(`servers/${member.guild.id}`).child('wchannelid').once('value')).val();
    const wmstatus = (await db.ref(`servers/${member.guild.id}`).child('welcomeMstatus').once('value')).val();
    const wleavetextonoff = (await db.ref(`servers/${member.guild.id}`).child('wleavetextonoff').once('value')).val();
    const lm = (await db.ref(`servers/${member.guild.id}`).child('lmessage').once('value')).val();
    const logswitch = (await db.ref(`servers/${member.guild.id}`).child('logswitch').once('value')).val();
    const logchannelid = (await db.ref(`servers/${member.guild.id}`).child('logchannelid').once('value')).val();
    if (wmstatus === true) {
        if (wc === null) return;
        if (wleavetextonoff === true) {
            if (lm === null) {
                member.guild.channels.cache.get(wc.toString()).send({content:`${member.user.tag} is left the server now we are ${member.guild.memberCount} members`})
            } else {
                member.guild.channels.cache.get(wc.toString()).send({content:lm.replace('{user}', 
                     member.user.tag.toString()).replace('{count}', 
                             member.guild.memberCount)});
            }
        }
    } else { return }
    if (logswitch) {
      let logch = member.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
      } else {
        let addembed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setAuthor({
          name: "Member Left " + member.user.tag.toString(),
          iconURL: member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
        })
        .setDescription(`**Member was**: <@${member.user.tag}> (${member.user.id})`)
        .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setImage(config.icwflahimg)
        .setFooter({
          text: `${bot.user.username}™ | Developed by: PK#1650 `,
          iconURL: `${config.pkflashlogo}`
        })
        .setTimestamp();
        logch.send({ embeds: [addembed] })
      }
      
    }
};
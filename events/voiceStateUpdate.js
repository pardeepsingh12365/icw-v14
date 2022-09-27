const Discord = require('discord.js');
const config = require("../config.js");
const yts = require("yt-search");
//const ytpl = require("ytpl");

const { 
  joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
  getVoiceConnection,
  Voice
} = require('@discordjs/voice');

module.exports = async (bot, db, oldState, newState) => {
  const newChannel = newState.channel;
  const oldChannel = oldState.channel;
  const newChID = newState.channelId;
  const oldChID = oldState.channelId;
  const newStateM = newState.member;
  const oldStateM = oldState.member;
  let queue = bot.player.getQueue(newStateM.guild.id);

  const logswitch = (await db.ref(`servers/${newStateM.guild.id}`).child('logswitch').once('value')).val();
  const logchannelid = (await db.ref(`servers/${newStateM.guild.id}`).child('logchannelid').once('value')).val();
  const autoleave = (await db.ref(`servers/${newStateM.guild.id}`).child('autoleave').once('value')).val();
  const autojoin = (await db.ref(`servers/${newStateM.guild.id}`).child('autojoin').once('value')).val();
  const altime = (await db.ref(`servers/${newStateM.guild.id}`).child('altime').once('value')).val();
  
  const autoplay = (await db.ref(`users/${newStateM.user.id}`).child('autoplay').once('value')).val();
  const apch = (await db.ref(`users/${newStateM.user.id}`).child('apch0').once('value')).val();
  const apch2 = (await db.ref(`users/${newStateM.user.id}/apch`).child('apch2').once('value')).val();
  const apsong = (await db.ref(`users/${newStateM.user.id}`).child('apsong').once('value')).val();

  var video = bot.radio.get("radio")
  //JOIN
  console.log("oldState: "+oldState.channelId)
  console.log("newState: "+newState.channelId)
  if (!oldChannel && newChannel) {
    console.log("user joined")
    if (logswitch) {
      let logch = newStateM.guild.channels.cache.get(logchannelid);
      if (!logch) return undefined;
      let addembed = new Discord.EmbedBuilder()
        .setColor("BLACK")
        .setAuthor({
          name: "Joined Voice " + newStateM.user.tag.toString(),
          iconURL: newStateM.user.displayAvatarURL
        })
        .setDescription(`**Member**: <@${newStateM.user.id}> (${newStateM.user.id})\n**Voice Channel Joined**: ${newChannel.name}`)
        .setThumbnail(newStateM.user.displayAvatarURL)
        .setImage(config.icwflahimg)
        .setFooter({
          text: `${bot.user.username}™ | Developed by: PK#1650 `,
          iconURL: `${config.pkflashlogo}`
        })
        .setTimestamp();
        logch.send({ embeds: [addembed] })
    }
//LEAVE
  } else if (!newChannel && oldChannel) {
    console.log("user leave")
    //console.log(oldUserChannel.members.has(bot.user.id))
    if (autoleave !== false && oldChannel.members.size === 1 && oldChannel.members.has(bot.user.id)) {
      if (queue) {
        if (!queue.data.message) {
          setTimeout(async function() {
            if (oldChannel.members.size > 1) return;
            queue.stop()
          }, altime ? altime : 120000)
        } else {
          let autoleave = new Discord.EmbedBuilder()
          .setColor("BLACK")
          .setAuthor({
            name: "anyone not in voice channel",
            iconURL: `${config.icwflashlogo}`
          })
          .setDescription(`im leaving now 🎧\nyou can disable autoleave with command\n\`\`$autoleave\`\``)
          .setFooter({
            text: `${bot.user.username}™ | Developed by: PK#1650 `,
            iconURL: `${config.pkflashlogo}`
          })
          .setImage(config.icwflahimg)
          .setTimestamp();
          setTimeout(async function() {
            if (oldChannel.members.size > 1) return undefined;
            queue.data.message.channel.send({embeds: [autoleave]})
            queue.stop()
          }, altime ? altime : 120000)
        }
      } else if (!queue) {
        setTimeout(function() {
          if (oldChannel.members.size > 1) return undefined;
          const connection = getVoiceConnection(oldState.guild.id)
          connection.destroy()
        }, altime ? altime : 120000)
      }
    } else {}
    if (logswitch) {
      let logch = newStateM.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
      } else {
        let addembed = new Discord.EmbedBuilder()
        .setColor("BLACK")
        .setAuthor({
          name: "Left Voice" + newStateM.user.tag.toString(),
          iconURL: newStateM.user.displayAvatarURL
        })
        .setDescription(`**Member**: <@${newStateM.user.id}> (${newStateM.user.id})\n**Voice Channel Left**: ${oldChannel.name}`)
        .setThumbnail(newStateM.user.displayAvatarURL)
        .setImage(config.icwflahimg)
        .setFooter({
          text: `${bot.user.username}™ | Developed by: PK#1650 `,
          iconURL: `${config.pkflashlogo}`
        })
        .setTimestamp();
        logch.send({ embeds: [addembed] })
      }
    }
// SWITCH
  } else if (oldChannel && newChannel) {
    console.log("user switch")
    if (logswitch) {
      let logch = newStateM.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
        
      } else {
        let addembed = new Discord.EmbedBuilder()
        .setColor("BLACK")
        .setAuthor("Switch Voice " + newStateM.user.tag.toString(), newStateM.user.displayAvatarURL)
        .setDescription(`**Member**: <@${newStateM.user.id}> (${newStateM.user.id})\n**Old Channel**: ${oldChannel.name}\n**New Channel**: ${newChannel.name}`)
        .setThumbnail(newStateM.user.displayAvatarURL)
        .setImage(config.icwflahimg)
        .setFooter(`${bot.user.username}™ | Developed by: PK#1650 `, `${config.pkflashlogo}`)
        .setTimestamp();
        logch.send({ embeds: [addembed] })
      }
    }

  } else {
    return;
  }
};
const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => {
  const easymode = (await db.ref(`servers/${message.guild.id}`).child('easymode').once('value')).val();
  const icwdisk = bot.emojis.cache.get('717950015724716153')
  let queue = bot.player.getQueue(message.guild.id);
  if (!queue || !queue.playing) {
    return message.channel.send({content:`Sorry but im not playing anything`})
  }
  var slink;
  if (queue.current.url.startsWith(`https://www.youtube.com`)) {
    slink = queue.current.url
  } else {
    slink = config.serverinvite
  }
  
  //if (easymode ===false) {
    if (!message.guild.members.me.voice.channel) {
      return message.channel.send({content:"bot is not in voice channel and nothing to play"}, { reply: message });
    }
    if (!queue.playing) return message.channel.send({content: 'No song in the queue'})
      const ProgressBar = queue.createProgressBar({timecodes: true, indicator: "●", length: 20});
      var songembed = new Discord.EmbedBuilder()
      
      .setColor("BLACK")
      //.setAuthor(`The current song is \`${serverQueue.songs[serverQueue.currentSongIndex].title}\` 🎧`)
      .setDescription(`${config.n} ${config.o} ${config.w} ${config.p} ${config.l} ${config.a} ${config.y} ${config.i} ${config.n} ${config.g}
${"🎧"} [${queue.current.title}](${slink})
${ProgressBar/*.prettier*/}`)
      .setThumbnail(`${queue.current.thumbnail}`)
      .setFooter({
        text: `Added by ${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`,
        iconURL: `https://cdn.discordapp.com/avatars/${queue.current.requestedBy.id}/${queue.current.requestedBy.avatar}.webp?size=240`
      })
      .setImage(config.icwflahimg)
      .setTimestamp();
      message.channel.send({ embeds: [songembed] });
  /*} else {
    const voll = bot.guildVolume.get(message.guild.id);
        if (!message.guild.me.voice.channel) {
            message.channel.send({content:"bot is not in voice channel and nothing to play"}, { reply: message });
            return;
        }
        if (serverQueue.songs.length > 0) {
          var songembed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`The current song is \`${serverQueue.songs[serverQueue.currentSongIndex].title}\` 🎧}`)
            .setDescription(`next song-\n\`\`${serverQueue.songs[serverQueue.currentSongIndex + 1] ? serverQueue.songs[serverQueue.currentSongIndex + 1].title : "no more song"}\`\`\n----------------------------------------------------`)
            .addField("song link",`[click me](${slink})`, true)
            .addField("song length", serverQueue.songs[serverQueue.currentSongIndex].duration, true)
            .addField("suggestion",`[click me](${config.serverinvite})`, true)
            .addField("volume",`${voll.volume}%`, true)
            .addField("repeat",serverQueue.repeat ? serverQueue.repeat : "off", true)
            .addField("shuffle",serverQueue.shuffle ? "on" : "off", true)
            .setThumbnail(`${serverQueue.songs[serverQueue.currentSongIndex].thumbnail}`)
            .setFooter(`Added by ${serverQueue.songs[serverQueue.currentSongIndex].user}`, serverQueue.songs[serverQueue.currentSongIndex].usravatar)
            .setImage(config.icwflahimg)
            .setTimestamp();
            message.channel.send({ embeds: [songembed] }).then (async msg => {
              await msg.react('650661307988705281') &&
                await msg.react('650661356931907614') &&
                await msg.react('◀️') &&
                await msg.react('▶️') &&
                await msg.react('⏸️') &&
                await msg.react('⏯️') &&
                await msg.react('⏹️') &&
                await msg.react('🔂') &&
                await msg.react('🔀')
                .then( r => {
              const upFilter = (reaction, user) => reaction.emoji.id === '650661307988705281';
              const downFilter = (reaction, user) => reaction.emoji.id === '650661356931907614';
              const prevFilter = (reaction, user) => reaction.emoji.name === '◀️';
              const nextFilter = (reaction, user) => reaction.emoji.name === '▶️';
              const pauseFilter = (reaction, user) => reaction.emoji.name === '⏸️';
              const resumeFilter = (reaction, user) => reaction.emoji.name === '⏯️';
              const stopFilter = (reaction, user) => reaction.emoji.name === '⏹️';
              const repeatFilter = (reaction, user) => reaction.emoji.name === '🔂';
              const shuffleFilter = (reaction, user) => reaction.emoji.name === '🔀';
              
              const up = msg.createReactionCollector(upFilter); 
              const down = msg.createReactionCollector(downFilter);
              const prev = msg.createReactionCollector(prevFilter);
              const next = msg.createReactionCollector(nextFilter);
              const pause = msg.createReactionCollector(pauseFilter);
              const resume = msg.createReactionCollector(resumeFilter);
              const stop = msg.createReactionCollector(stopFilter);
              const repeat = msg.createReactionCollector(repeatFilter);
              const shuffle = msg.createReactionCollector(shuffleFilter);
              
      up.on('collect', r => {
        let ru = r.users.cache.map(u => u.id).slice(-1)
        if (ru[0] === bot.user.id) return;
        if (message.guild.member(ru[0]).voice.channel !== message.guild.me.voice.channel) return undefined;
          if (msg.channel.lastMessage.embeds[0]) {
            if (msg.channel.lastMessage.embeds[0].fields[3].name.startsWith("volume") && msg.channel.lastMessage.embeds[0].fields[3].value.endsWith("%")) {
            if (r.users.cache.map(u => u === message.member.voice.channel)) {
              let m = msg.channel.lastMessage.embeds[0].fields[3].value
              let slicevol = m.substring(0, m.length - 1)
              var vol;
              if (slicevol < 100) {
                vol = parseInt(slicevol) + 10
              } else {
                vol = 0
              }
              if (serverQueue) {
                if (serverQueue.connection) {
                  if (serverQueue.connection.dispatcher) {
                    serverQueue.connection.dispatcher.setVolumeLogarithmic(vol / 80);
                  }
                }
              }
              const volumeConstruct = {
                volume: vol
              };
              bot.guildVolume.set(message.guild.id, volumeConstruct);
                
              var editvolembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`The current song is \`${serverQueue.songs[serverQueue.currentSongIndex].title}\` 🎧`)
                .setDescription(`next song-\n\`\`${serverQueue.songs[serverQueue.currentSongIndex + 1] ? serverQueue.songs[serverQueue.currentSongIndex + 1].title : "no more song"}\`\`\n----------------------------------------------------`)
                .addField("song link",`[click me](${slink})`, true)
                .addField("song length", serverQueue.songs[serverQueue.currentSongIndex].duration, true)
                .addField("suggestion",`[click me](${config.serverinvite})`, true)
                .addField("volume",`${vol}%`, true)
                .addField("repeat",serverQueue.repeat ? serverQueue.repeat : "off", true)
                .addField("shuffle",serverQueue.shuffle ? "on" : "off", true)
                .setThumbnail(`${serverQueue.songs[serverQueue.currentSongIndex].thumbnail}`)
                .setFooter(`vol + by ${msg.guild.members.cache.get(ru[0]).user.username}`, msg.guild.members.cache.get(ru[0]).user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                .setImage(config.icwflahimg)
                .setTimestamp();
                msg.edit({embeds: [editvolembed]})
                let nbu = r.users.cache.filter(u => u.id !== bot.user.id).map(u => u.id)
                if (message.guild.member(bot.user).permissions.has("MANAGE_MESSAGES")) {
                  r.users.remove(ru[0]);
                }
            }
          }
          }
      })
     
      down.on('collect', r => {
        let ru = r.users.cache.map(u => u.id).slice(-1)
        if (ru[0] === bot.user.id) return;
        if (message.guild.member(ru[0]).voice.channel !== message.guild.me.voice.channel) return undefined;
          if (msg.channel.lastMessage.embeds[0]) {
            if (msg.channel.lastMessage.embeds[0].fields[3].name.startsWith("volume") && msg.channel.lastMessage.embeds[0].fields[3].value.endsWith("%")) {
            if (r.users.cache.map(u => u === message.member.voice.channel)) {
              let m = msg.channel.lastMessage.embeds[0].fields[3].value
              let slicevol = m.substring(0, m.length - 1)
              var vol;
              if (slicevol > 0) {
                vol = parseInt(slicevol) - 10
              } else {
                vol = 100
              }
              if (serverQueue) {
                if (serverQueue.connection) {
                  if (serverQueue.connection.dispatcher) {
                    serverQueue.connection.dispatcher.setVolumeLogarithmic(vol / 80);
                  }
                }
              }
              const volumeConstruct = {
                volume: vol
              };
              bot.guildVolume.set(message.guild.id, volumeConstruct);
                
                var editvolembed = new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setAuthor(`The current song is \`${serverQueue.songs[serverQueue.currentSongIndex].title}\` 🎧`)
                  .setDescription(`next song-\n\`\`${serverQueue.songs[serverQueue.currentSongIndex + 1] ? serverQueue.songs[serverQueue.currentSongIndex + 1].title : "no more song"}\`\`\n----------------------------------------------------`)
                  .addField("song link",`[click me](${slink})`, true)
                  .addField("song length", serverQueue.songs[serverQueue.currentSongIndex].duration, true)
                  .addField("suggestion",`[click me](${config.serverinvite})`, true)
                  .addField("volume",`${vol}%`, true)
                  .addField("repeat",serverQueue.repeat ? serverQueue.repeat : "off", true)
                  .addField("shuffle",serverQueue.shuffle ? "on" : "off", true)
                  .setThumbnail(`${serverQueue.songs[serverQueue.currentSongIndex].thumbnail}`)
                  .setFooter(`vol - by ${msg.guild.members.cache.get(ru[0]).user.username}`, msg.guild.members.cache.get(ru[0]).user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                  .setImage(config.icwflahimg)
                  .setTimestamp();
                msg.edit({embeds: [editvolembed]})
                let nbu = r.users.cache.filter(u => u.id !== bot.user.id).map(u => u.id)
                if (message.guild.member(bot.user).permissions.has("MANAGE_MESSAGES")) {
                  r.users.remove(ru[0]);
                }
              }
            }
          }
        })
    prev.on('collect', r => {
      let ru = r.users.cache.map(u => u.id).slice(-1)
      if (ru[0] === bot.user.id) return;
        if (message.guild.member(ru[0]).voice.channel !== message.guild.me.voice.channel) return undefined;
          if (msg.channel.lastMessage.embeds[0]) {
            if (msg.channel.lastMessage.embeds[0].fields[3].name.startsWith("volume") && msg.channel.lastMessage.embeds[0].fields[3].value.endsWith("%")) {
              if (r.users.cache.map(u => u === message.member.voice.channel)) {
                if (serverQueue.songs.length > 0) {
                serverQueue.previousSongIndex = serverQueue.currentSongIndex;
                var amount = Number.parseInt(args[0]);
                if (Number.isInteger(amount)) {
                    serverQueue.currentSongIndex -= amount;
                } else {
                    serverQueue.currentSongIndex--;
                }
                if (serverQueue.currentSongIndex < 0) {
                    serverQueue.currentSongIndex = 0;
                }
                if (serverQueue) {
                  if (serverQueue.connection) {
                    if (serverQueue.connection.dispatcher) {
                      serverQueue.reason = "prev";
                      serverQueue.connection.dispatcher.end("prev");
                    }
                  }
                }
              var editvolembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`The current song is \`${serverQueue.songs[serverQueue.currentSongIndex].title}\` 🎧`)
                .setDescription(`next song-\n\`\`${serverQueue.songs[serverQueue.currentSongIndex + 1] ? serverQueue.songs[serverQueue.currentSongIndex + 1].title : "no more song"}\`\`\n----------------------------------------------------`)
                .addField("song link",`[click me](${slink})`, true)
                .addField("song length", serverQueue.songs[serverQueue.currentSongIndex].duration, true)
                .addField("suggestion",`[click me](${config.serverinvite})`, true)
                .addField("volume",`${voll.volume}%`, true)
                .addField("repeat",serverQueue.repeat ? serverQueue.repeat : "off", true)
                .addField("shuffle",serverQueue.shuffle ? "on" : "off", true)
                .setThumbnail(`${serverQueue.songs[serverQueue.currentSongIndex].thumbnail}`)
                .setFooter(`prev by ${msg.guild.members.cache.get(ru[0]).user.username}`, msg.guild.members.cache.get(ru[0]).user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                .setImage(config.icwflahimg)
                .setTimestamp();
                msg.edit({embeds: [editvolembed]})
              let nbu = r.users.cache.filter(u => u.id !== bot.user.id).map(u => u.id)
              if (message.guild.member(bot.user).permissions.has("MANAGE_MESSAGES")) {
                r.users.remove(ru[0]);
              }
            }
          }
          }
          }
      })
      next.on('collect', r => {
      let ru = r.users.cache.map(u => u.id).slice(-1)
      if (ru[0] === bot.user.id) return;
        if (message.guild.member(ru[0]).voice.channel !== message.guild.me.voice.channel) return undefined;
          if (msg.channel.lastMessage.embeds[0]) {
            if (msg.channel.lastMessage.embeds[0].fields[3].name.startsWith("volume") && msg.channel.lastMessage.embeds[0].fields[3].value.endsWith("%")) {
              if (r.users.cache.map(u => u === message.member.voice.channel)) {
              var lm = msg.channel.lastMessage.embeds[0]
              var  csong;
              var des;
              var  durvalue;
              var durname
              var linkname;
              var linkvalue;
              var thumb;
              if (serverQueue.currentSongIndex < serverQueue.songs.length - 1) {
                csong = `The current song is \`${serverQueue.songs[serverQueue.currentSongIndex + 1].title}\` 🎧`
                des = `next song-n\`\`${serverQueue.songs[serverQueue.currentSongIndex + 1] ? serverQueue.songs[serverQueue.currentSongIndex + 1].title : "no more song"}\`\`\n----------------------------------------------------`
                durname = `song length`
                durvalue = `${serverQueue.songs[serverQueue.currentSongIndex].duration}`
                linkname = `song link`
                linkvalue = `[click me](${slink})`
                thumb = serverQueue.songs[serverQueue.currentSongIndex].thumbnail
                if (serverQueue.songs.length > 0) {
                  serverQueue.previousSongIndex = serverQueue.currentSongIndex;
                  var amount = Number.parseInt(args[0]);
                    if (Number.isInteger(amount)) {
                      serverQueue.currentSongIndex += amount;
                    } else {
                      serverQueue.currentSongIndex++;
                    }
                      if (serverQueue) {
                        if (serverQueue.connection) {
                          if (serverQueue.connection.dispatcher) {
                            serverQueue.reason = "next";                           
                            serverQueue.connection.dispatcher.end("next");
                          }
                        }
                      }
                    }
              } else {
                if (serverQueue) {
                        if (serverQueue.connection) {
                          if (serverQueue.connection.dispatcher) {
                            serverQueue.connection.dispatcher.end("stopping");
                          }
                        }
                      }
                 bot.songQueue.delete(message.guild.id)
                 message.member.voice.channel.leave();
                csong = `Last song was ${lm.author.name.substring(20)}`
                des = `no more song for playing\nnow im leaving\n----------------------------------------------------`
                durname = `last song length`
                durvalue = `${lm.fields[1].value}`
                linkname = `last song link`
                linkvalue = `${lm.fields[0].value}`
                thumb = lm.thumbnail.url;
              }
              var editvolembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`${csong}`)
                .setDescription(des)
                .addField(linkname,linkvalue, true)
                .addField(durname,durvalue, true)
                .addField("suggestion",`[click me](${config.serverinvite})`, true)
                .addField("volume",`${voll.volume}%`, true)
                .addField("repeat",serverQueue.repeat ? serverQueue.repeat : "off", true)
                .addField("shuffle",serverQueue.shuffle ? "on" : "off", true)
                .setThumbnail(`${thumb}`)
                .setFooter(`skip by ${msg.guild.members.cache.get(ru[0]).user.username}`, msg.guild.members.cache.get(ru[0]).user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                .setImage(config.icwflahimg)
                .setTimestamp();
                msg.edit({embeds: [editvolembed]})
              let nbu = r.users.cache.filter(u => u.id !== bot.user.id).map(u => u.id)
              if (message.guild.member(bot.user).permissions.has("MANAGE_MESSAGES")) {
                r.users.remove(ru[0]);
              }
            }
          }
          }
      })
      pause.on('collect', r => {
      let ru = r.users.cache.map(u => u.id).slice(-1)
      if (ru[0] === bot.user.id) return;
        if (message.guild.member(ru[0]).voice.channel !== message.guild.me.voice.channel) return undefined;
          if (msg.channel.lastMessage.embeds[0]) {
            if (msg.channel.lastMessage.embeds[0].fields[3].name.startsWith("volume") && msg.channel.lastMessage.embeds[0].fields[3].value.endsWith("%")) {
              if (r.users.cache.map(u => u === message.member.voice.channel)) {
                      if (serverQueue) {
                        if (serverQueue.connection) {
                          if (serverQueue.connection.dispatcher) {
                            serverQueue.connection.dispatcher.pause();
                          }
                        }
                      }
                    }
                  }
              var editvolembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`The current song is \`${serverQueue.songs[serverQueue.currentSongIndex].title}\` 🎧`)
                .setDescription(`next song-\n\`\`${serverQueue.songs[serverQueue.currentSongIndex + 1] ? serverQueue.songs[serverQueue.currentSongIndex + 1].title : "no more song"}\`\`\n----------------------------------------------------`)
                .addField("song link",`[click me](${slink})`, true)
                .addField("song length", serverQueue.songs[serverQueue.currentSongIndex].duration, true)
                .addField("suggestion",`[click me](${config.serverinvite})`, true)
                .addField("volume",`${voll.volume}%`, true)
                .addField("repeat",serverQueue.repeat ? serverQueue.repeat : "off", true)
                .addField("shuffle",serverQueue.shuffle ? "on" : "off", true)
                .setThumbnail(`${serverQueue.songs[serverQueue.currentSongIndex].thumbnail}`)
                .setFooter(`paused by ${msg.guild.members.cache.get(ru[0]).user.username}`, msg.guild.members.cache.get(ru[0]).user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                .setImage(config.icwflahimg)
                .setTimestamp();
                msg.edit({embeds: [editvolembed]})
              let nbu = r.users.cache.filter(u => u.id !== bot.user.id).map(u => u.id)
              if (message.guild.member(bot.user).permissions.has("MANAGE_MESSAGES")) {
                r.users.remove(ru[0]);
              }
            }     
      })
      resume.on('collect', r => {
      let ru = r.users.cache.map(u => u.id).slice(-1)
      if (ru[0] === bot.user.id) return;
        if (message.guild.member(ru[0]).voice.channel !== message.guild.me.voice.channel) return undefined;
          if (msg.channel.lastMessage.embeds[0]) {
            if (msg.channel.lastMessage.embeds[0].fields[3].name.startsWith("volume") && msg.channel.lastMessage.embeds[0].fields[3].value.endsWith("%")) {
              if (r.users.cache.map(u => u === message.member.voice.channel)) {
                      if (serverQueue) {
                        if (serverQueue.connection) {
                          if (serverQueue.connection.dispatcher) {
                            serverQueue.connection.dispatcher.resume();
                          }
                        }
                      }
                    }
                  }
              var editvolembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`The current song is \`${serverQueue.songs[serverQueue.currentSongIndex].title}\` 🎧`)
                .setDescription(`next song-\n\`\`${serverQueue.songs[serverQueue.currentSongIndex + 1] ? serverQueue.songs[serverQueue.currentSongIndex + 1].title : "no more song"}\`\`\n----------------------------------------------------`)
                .addField("song link",`[click me](${slink})`, true)
                .addField("song length", serverQueue.songs[serverQueue.currentSongIndex].duration, true)
                .addField("suggestion",`[click me](${config.serverinvite})`, true)
                .addField("volume",`${voll.volume}%`, true)
                .addField("repeat",serverQueue.repeat ? serverQueue.repeat : "off", true)
                .addField("shuffle",serverQueue.shuffle ? "on" : "off", true)
                .setThumbnail(`${serverQueue.songs[serverQueue.currentSongIndex].thumbnail}`)
                .setFooter(`resumed by ${msg.guild.members.cache.get(ru[0]).user.username}`, msg.guild.members.cache.get(ru[0]).user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                .setImage(config.icwflahimg)
                .setTimestamp();
                msg.edit({embeds: [editvolembed]})
              let nbu = r.users.cache.filter(u => u.id !== bot.user.id).map(u => u.id)
              if (message.guild.member(bot.user).permissions.has("MANAGE_MESSAGES")) {
                r.users.remove(ru[0]);
              }
            }     
      })
      stop.on('collect', r => {
      let ru = r.users.cache.map(u => u.id).slice(-1)
      if (ru[0] === bot.user.id) return;
        if (message.guild.member(ru[0]).voice.channel !== message.guild.me.voice.channel) return undefined;
          if (msg.channel.lastMessage.embeds[0]) {
            if (msg.channel.lastMessage.embeds[0].fields[3].name.startsWith("volume") && msg.channel.lastMessage.embeds[0].fields[3].value.endsWith("%")) {
              if (r.users.cache.map(u => u === message.member.voice.channel)) {
                if (serverQueue) {
                  if (serverQueue.connection) {
                    if (serverQueue.connection.dispatcher) {
                      serverQueue.connection.dispatcher.end("stopping");
                      bot.songQueue.delete(message.guild.id)
                      message.member.voice.channel.leave();
                      bot.songQueue.delete(message.guild.id)
                    }
                  }
                }
              }
              var editvolembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`The current song is \`${serverQueue.songs[serverQueue.currentSongIndex].title}\` 🎧`)
                .setDescription(`next song-\n\`\`${serverQueue.songs[serverQueue.currentSongIndex + 1] ? serverQueue.songs[serverQueue.currentSongIndex + 1].title : "no more song"}\`\`\n----------------------------------------------------`)
                .addField("song link",`[click me](${slink})`, true)
                .addField("song length", serverQueue.songs[serverQueue.currentSongIndex].duration, true)
                .addField("suggestion",`[click me](${config.serverinvite})`, true)
                .addField("volume",`${voll.volume}%`, true)
                .addField("repeat",serverQueue.repeat ? serverQueue.repeat : "off")
                .addField("shuffle",serverQueue.shuffle ? "on" : "off", true)
                .setThumbnail(`${serverQueue.songs[serverQueue.currentSongIndex].thumbnail}`)
                .setFooter(`stoped by ${msg.guild.members.cache.get(ru[0]).user.username}`, msg.guild.members.cache.get(ru[0]).user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                .setImage(config.icwflahimg)
                .setTimestamp();
                msg.edit({embeds: [editvolembed]})
              let nbu = r.users.cache.filter(u => u.id !== bot.user.id).map(u => u.id)
              if (message.guild.member(bot.user).permissions.has("MANAGE_MESSAGES")) {
                r.users.remove(ru[0]);
              }
            }
          }
      })
      repeat.on('collect', r => {
      let ru = r.users.cache.map(u => u.id).slice(-1)
      if (ru[0] === bot.user.id) return;
        if (message.guild.member(ru[0]).voice.channel !== message.guild.me.voice.channel) return undefined;
          if (msg.channel.lastMessage.embeds[0]) {
            if (msg.channel.lastMessage.embeds[0].fields[3].name.startsWith("volume") && msg.channel.lastMessage.embeds[0].fields[3].value.endsWith("%")) {
              if (r.users.cache.map(u => u === message.member.voice.channel)) {
                if (serverQueue) {
                  if (serverQueue.repeat === false) {
			              serverQueue.repeat = "one";
		              } else if (serverQueue.repeat === "one") {
			                serverQueue.repeat = "all";
		              } else if (serverQueue.repeat === "all") {
                    serverQueue.repeat = false;
                  }
                }
              }
              var editvolembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`The current song is \`${serverQueue.songs[serverQueue.currentSongIndex].title}\` 🎧`)
                .setDescription(`next song-\n\`\`${serverQueue.songs[serverQueue.currentSongIndex + 1] ? serverQueue.songs[serverQueue.currentSongIndex + 1].title : "no more song"}\`\`\n----------------------------------------------------`)
                .addField("song link",`[click me](${slink})`, true)
                .addField("song length", serverQueue.songs[serverQueue.currentSongIndex].duration, true)
                .addField("suggestion",`[click me](${config.serverinvite})`, true)
                .addField("volume",`${voll.volume}%`, true)
                .addField("repeat",serverQueue.repeat ? serverQueue.repeat : "off", true)
                .addField("shuffle",serverQueue.shuffle ? "on" : "off", true)
                .setThumbnail(`${serverQueue.songs[serverQueue.currentSongIndex].thumbnail}`)
                .setFooter(`repeat ${serverQueue.repeat ? "on" : "off"} by ${msg.guild.members.cache.get(ru[0]).user.username}`, msg.guild.members.cache.get(ru[0]).user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                .setImage(config.icwflahimg)
                .setTimestamp();
                msg.edit({embeds: [editvolembed]})
              if (message.guild.member(bot.user).permissions.has("MANAGE_MESSAGES")) {
                r.users.remove(ru[0]);
              }
            }
          }
      })
      shuffle.on('collect',r => {
      let ru = r.users.cache.map(u => u.id).slice(-1)
      if (ru[0] === bot.user.id) return;
        if (message.guild.member(ru[0]).voice.channel !== message.guild.me.voice.channel) return undefined;
          if (msg.channel.lastMessage.embeds[0]) {
            if (msg.channel.lastMessage.embeds[0].fields[3].name.startsWith("volume") && msg.channel.lastMessage.embeds[0].fields[3].value.endsWith("%")) {
              if (r.users.cache.map(u => u === message.member.voice.channel)) {
                if (serverQueue) {
                  if(serverQueue.shuffle){
			              serverQueue.shuffle = false;
		                } else{
			                serverQueue.shuffle = true;
		                }
                }
              }
              var editvolembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`The current song is \`${serverQueue.songs[serverQueue.currentSongIndex].title}\` 🎧`)
                .setDescription(`next song-\n\`\`${serverQueue.songs[serverQueue.currentSongIndex + 1] ? serverQueue.songs[serverQueue.currentSongIndex + 1].title : "no more song"}\`\`\n----------------------------------------------------`)
                .addField("song link",`[click me](${slink})`, true)
                .addField("song length", serverQueue.songs[serverQueue.currentSongIndex].duration, true)
                .addField("suggestion",`[click me](${config.serverinvite})`, true)
                .addField("volume",`${voll.volume}%`, true)
                .addField("repeat",serverQueue.repeat ? serverQueue.repeat : "off", true)
                .addField("shuffle",serverQueue.shuffle ? "on" : "off", true)
                .setThumbnail(`${serverQueue.songs[serverQueue.currentSongIndex].thumbnail}`)
                .setFooter(`shuffle ${serverQueue.shuffle ? "on" : "off"} by ${msg.guild.members.cache.get(ru[0]).user.username}`, msg.guild.members.cache.get(ru[0]).user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
                .setImage(config.icwflahimg)
                .setTimestamp();
                msg.edit({embeds: [editvolembed]})
              if (message.guild.member(bot.user).permissions.has("MANAGE_MESSAGES")) {
                r.users.remove(ru[0]);
              }
            }
          }
      })
              

      })
    })
        } else {
            message.channel.send("No song is in the queue", { reply: message });
        }
  }*/
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['np', 'nowplaying'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'song',
	category: 'music',
	description: 'for check the current song',
	usage: '$song'
};
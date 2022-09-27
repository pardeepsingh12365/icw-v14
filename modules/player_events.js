const Discord = require("discord.js");
const config = require("../config.js");

module.exports.registerPlayerEvents = (player, bot, db) => {
  // Init the event listener only once (at the top of your code).
player
// Emitted when channel was empty.
  .on("channelEmpty", (queue) => {
      //queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
  })

// Emitted when a song was added to the queue.
  .on('trackAdd',  (queue, track) => {
    let embed = new Discord.EmbedBuilder()
      //.setAuthor(`I have added \`${song.title}\` to the song queue!`,`${config.icwflashlogo}`)
      .setDescription(`${config.s} ${config.o} ${config.n} ${config.g} ${config.a} ${config.d} ${config.d} ${config.e} ${config.d}
${"🎧"} [${track.title}](${track.url})
length: ${track.duration}`
      )
      .setColor("BLACK")
      .setThumbnail(track.thumbnail)
      .setFooter({
        text: "Added by: " + `${track.requestedBy.username}#${track.requestedBy.discriminator}`,
        iconURL: `https://cdn.discordapp.com/avatars/${track.requestedBy.id}/${track.requestedBy.avatar}.webp?size=240`
      })
      .setImage(config.icwflahimg)
      .setTimestamp();
      queue.metadata.send({ embeds: [embed] });
      console.log(`Song ${track} was added to the queue.`)
    })

    // Emitted when a playlist was added to the queue.
    .on('playlistAdd',  (queue, playlist) => {
        console.log(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`)
        if (!queue.metadata) return undefined;
        queue.metadata.send({content: `Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`})
    })
    // Emitted when the queue was destroyed (either by ending or stopping).    
    .on('queueEnd',  (queue) => {
      var finishembed = new Discord.EmbedBuilder()
        .setColor("BLACK")
        .setDescription("**Music player has been stopped** 🎧")
        .setFooter({
          text: `${bot.user.username}™ | Developed by: PK#6768 `,
          iconURL: `${config.pkflashlogo}`
        })
        .setImage(config.icwflahimg)
        .setTimestamp();
      queue.metadata.send({ embeds: [finishembed] });
      console.log(`The queue has ended.`)
    })

    // Emitted when a song changed.
    .on('trackStart', async (queue, track) => {
       const npmsg = (await db.ref(`servers/${queue.guild.id}`).child("npmsg").once("value")).val();
       const npmsgch = (await db.ref(`servers/${queue.guild.id}`).child("npmsgch").once("value")).val();
       if (npmsg === false) return undefined;
       var slink;
       if (track.url.startsWith(`https://www.youtube.com`)) {
          //stream = ytdl(currentSong.url, {/*type: 'opus', */filter: "audioonly"/*,quality: aquality,highWaterMark: 600 *//*1 << 20*/}); //.pipe(transcoder);
         slink = track.url;
       } else {
         slink = config.serverinvite;
       }
  
        var nowplayembed = new Discord.EmbedBuilder()
          .setColor("BLACK")
          //.setAuthor({name: ``, iconURL: `${config.icwflashlogo}`})
          .setDescription(`${config.n} ${config.o} ${config.w} ${config.p} ${config.l} ${config.a} ${config.y} ${config.i} ${config.n} ${config.g}
${bot.emojis.cache.get('943100451904192522')} [${track.title}](${slink})
length: ${track.duration}`)
          .setThumbnail(`${track.thumbnail}`)
          .setFooter({
            text: "Requested by: " + `${track.requestedBy.username}#${track.requestedBy.discriminator}`, 
            iconURL: `https://cdn.discordapp.com/avatars/${track.requestedBy.id}/${track.requestedBy.avatar}.webp?size=240`
          })
          .setImage(config.icwflahimg)
          .setTimestamp();
        if (npmsgch) {
          queue.guild.channels.cache.get(npmsgch).send({embeds: [nowplayembed]})
        } else {
          if (!queue.metadata) return undefined;
          if (queue.metadata.lastMessage.components[0]) {
            if (queue.metadata.lastMessage.components[0].components[0].data.custom_id  === 'prev') return undefined;
          } else {
            queue.metadata.send({ embeds: [nowplayembed] })
          }
        }
        console.log(`${track} is now playing.`)
    })
    // Emitted when someone disconnected the bot from the channel.
    .on('botDisconnect', (queue) =>
        console.log(`I was kicked from the Voice Channel, queue ended.`))
    // Emitted when there was an error in runtime
    .on('error', (queue, error) => {
        console.log(`Error: ${error} in ${queue.guild.name}`);
    })
    
    .on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });
};
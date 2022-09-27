const Discord = require('discord.js')
const config = require("../config.js")
const { ActionRowBuilder, 	ButtonBuilder } = require('discord.js');
//const { RepeatMode } = require('discord-music-player');


exports.run = async (bot, message, args, command, db) => {

  const queue = bot.player.getQueue(message.guild.id);
  
  if (!message.guild.members.me.voice.channel) {
    message.channel.send({content:"bot is not in voice channel and nothing to play"}, { reply: message });
            return;
        }
        
  var slink;
  if (queue.current.url.startsWith(`https://www.youtube.com`)) {
    slink = queue.current.url
  } else {
    slink = config.serverinvite
  }
  var songembed = new Discord.EmbedBuilder()
    .setColor("BLACK")
    .setDescription(`Now playing- [**${queue.current.title}**](${slink}) 🎧
next song- \`\`${queue.tracks[0] ? queue.tracks[0].title : "no more song"}\`\`
${queue.createProgressBar({timecodes: true, indicator: "●", length: 20})}
**volume** \`\`${queue.volume}%\`\`                    **repeat** \`\`${queue.repeatMode !== 0 ? [queue.repeatMode === 1 ? "one song" : "all queue"] : "off"}\`\`                    **support** [link](${config.serverinvite})`)
     .setThumbnail(`${queue.current.thumbnail}`)
     .setFooter({
            text: "Requested by: " + `${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`, 
            iconURL: `https://cdn.discordapp.com/avatars/${queue.current.requestedBy.id}/${queue.current.requestedBy.avatar}.webp?size=240`
          })
     .setImage(config.icwflahimg)
     .setTimestamp();
          
     const row1 = new ActionRowBuilder().addComponents(
       new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('◀️')
            .setStyle(2),
       new ButtonBuilder()
            .setCustomId('playpause')
            .setLabel('⏯️')
            .setStyle(2),
       new ButtonBuilder()
            .setCustomId('next')
            .setLabel('▶️')
            .setStyle(2),
       new ButtonBuilder()
            .setCustomId('stop')
            .setLabel('⏹️')
            .setStyle(2)
       )
     const row2 = new ActionRowBuilder().addComponents(
       new ButtonBuilder()
            .setCustomId('repeat')
            .setLabel('🔁')
            .setStyle(2),
       new ButtonBuilder()
            .setCustomId('volinc')
            .setLabel('vol +')
            .setStyle(2),
       new ButtonBuilder()
            .setCustomId('voldec')
            .setLabel('vol -')
            .setStyle(2),
       new ButtonBuilder()
            .setCustomId('volmute')
            .setLabel('mute')
            .setStyle(4)
     )
          
     const sentMessage = await message.channel.send({embeds:[songembed], components: [row1, row2], ephemeral: true })
     
/*             PREVIOUS SONG                 */

     const filter1 = i => i.customId === 'prev' && i.user.id === message.member.user.id;

     const collector1 = message.channel.createMessageComponentCollector({ filter1, /*time: 50000 */});

     collector1.on('collect', async i => {
       if (i.customId === 'prev') {
         if (!queue || !queue.playing) return;
         await queue.back()
         await i.deferUpdate()
         if (!queue || !queue.playing) return;
         setTimeout(async () => {
         var songembed = new Discord.EmbedBuilder()
           .setColor("BLACK")
           .setDescription(`Now playing- [**${queue.current.title}**](${slink}) 🎧
next song- \`\`${queue.tracks[0] ? queue.tracks[0].title : "no more song"}\`\`
${queue.createProgressBar({timecodes: true, indicator: "●", length: 20})}
**volume** \`\`${queue.volume}%\`\`                    **repeat** \`\`${queue.repeatMode === 1 ? "one song"  : queue.repeatMode === 2 ? "all queue"  : queue.repeatMode === 3 ? "autoplay" : "off"}\`\`                    **support** [link](${config.serverinvite})`)
           .setThumbnail(`${queue.current.thumbnail}`)
           .setFooter({
            text: "Requested by: " + `${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`, 
            iconURL: `https://cdn.discordapp.com/avatars/${queue.current.requestedBy.id}/${queue.current.requestedBy.avatar}.webp?size=240`
          })
            .setImage(config.icwflahimg)
            .setTimestamp();
            //await i.deferUpdate()
            await i.message.edit({ embeds: [songembed], components: [row1, row2] , ephemeral : true});
         }, 200);
       }
     })
     
/*             PLAY PAUSE                 */

     const filter2 = i => i.customId === 'playpause' && i.user.id === message.member.user.id;

     const collector2 = sentMessage.createMessageComponentCollector({ filter2, /*time: 50000 */});

     collector2.on('collect', async i => {
       if (i.customId === 'playpause') {
         if (!queue || !queue.playing) return;
         var paused
         if(queue.connection.paused) {
           paused = ''
           queue.setPaused(false)
         } else {
           paused = '\npaused'
           queue.setPaused(true)
         }
         
         var songembed = new Discord.EmbedBuilder()
           .setColor("BLACK")
           .setDescription(`Now playing- [**${queue.current.title}**](${slink}) 🎧
next song- \`\`${queue.tracks[0] ? queue.tracks[0].title : "no more song"}\`\`
${queue.createProgressBar({timecodes: true, indicator: "●", length: 20})}
**volume** \`\`${queue.volume}%\`\`                    **repeat** \`\`${queue.repeatMode === 1 ? "one song" : queue.repeatMode === 2 ? "all queue" : queue.repeatMode === 3 ? "autoplay" : "off"}\`\`                    **support** [link](${config.serverinvite}) ${paused}`)
           .setThumbnail(`${queue.current.thumbnail}`)
           .setFooter({
            text: "Requested by: " + `${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`, 
            iconURL: `https://cdn.discordapp.com/avatars/${queue.current.requestedBy.id}/${queue.current.requestedBy.avatar}.webp?size=240`
          })
            .setImage(config.icwflahimg)
            .setTimestamp();
            
            await i.deferUpdate()
            await i.message.edit({ embeds: [songembed], components: [row1, row2] , ephemeral : true});
       }
     })
     
/*             NEXT SONG                 */

     const filter3 = i => i.customId === 'next' && i.user.id === message.member.user.id;

     const collector3 = sentMessage.createMessageComponentCollector({ filter3, /*time: 500000*/ });

     collector3.on('collect', async i => {  
       if (i.customId === 'next') {
         if (!queue || !queue.playing) return;
         await queue.skip()
         await i.deferUpdate()
         if (!queue || !queue.playing) return;
         //await console.log(guildQueue.nowPlaying.name)
         setTimeout(async () =>{
         var songembed = new Discord.EmbedBuilder()
           .setColor("BLACK")
           .setDescription(`Now playing- [**${queue.current.title}**](${slink}) 🎧
next song- \`\`${queue.tracks[0] ? queue.tracks[0].title : "no more song"}\`\`
${queue.createProgressBar({timecodes: true, indicator: "●", length: 20})}
**volume** \`\`${queue.volume}%\`\`                    **repeat** \`\`${queue.repeatMode === 1 ? "one song"  : queue.repeatMode === 2 ? "all queue"  : queue.repeatMode === 3 ? "autoplay" : "off"}\`\`                    **support** [link](${config.serverinvite})`)
           .setThumbnail(`${queue.current.thumbnail}`)
           .setFooter({
            text: "Requested by: " + `${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`, 
            iconURL: `https://cdn.discordapp.com/avatars/${queue.current.requestedBy.id}/${queue.current.requestedBy.avatar}.webp?size=240`
          })
            .setImage(config.icwflahimg)
            .setTimestamp();
           //await queue.skip()
            //await i.deferUpdate()
            await i.message.edit({ embeds: [songembed], components: [row1, row2] , ephemeral : true});
         },200)
       }
     })
     
/*             STOP                 */

     const filter4 = i => i.customId === 'stop' && i.user.id === message.member.user.id;

     const collector4 = sentMessage.createMessageComponentCollector({ filter4, /*time: 50000 */});

     collector4.on('collect', async i => {
       if (i.customId === 'stop') {
         if (!queue || !queue.playing) return;
         //queue.stop()
         var songembed = new Discord.EmbedBuilder()
           .setColor("BLACK")
           .setDescription(`Now playing- [**${queue.current.title}**](${slink}) 🎧
next song- \`\`${queue.tracks[0] ? queue.tracks[0].title : "no more song"}\`\`
${queue.createProgressBar({timecodes: true, indicator: "●", length: 20})}
**volume** \`\`${queue.volume}%\`\`                    **repeat** \`\`${queue.repeatMode === 1 ? "one song"  : queue.repeatMode === 2 ? "all queue"  : queue.repeatMode === 3 ? "autoplay" : "off"}\`\`                    **support** [link](${config.serverinvite})`)
            .setThumbnail(`${queue.current.thumbnail}`)
            .setFooter({
            text: "Stoped by: " + `${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`, 
            iconURL: `https://cdn.discordapp.com/avatars/${queue.current.requestedBy.id}/${queue.current.requestedBy.avatar}.webp?size=240`
          })
            .setImage(config.icwflahimg)
            .setTimestamp();
            //await i.deferReply()
         queue.stop()
            await i.deferUpdate()
            await i.editReply({ embeds: [songembed], components: [row1, row2] , ephemeral : true});
       }
     })
     
/*             REPEAT                 */

     const filter5 = i => i.customId === 'repeat' && i.user.id === message.member.user.id;

     const collector5 = sentMessage.createMessageComponentCollector({ filter5, /*time: 50000 */});

     collector5.on('collect', async i => {
       if (i.customId === 'repeat') {
         if (!queue || !queue.playing) return;
         var repeatMode;
         if (queue.repeatMode === 0){
           repeatMode = 'one song'
			     queue.setRepeatMode(1);
		     } else if (queue.repeatMode === 1) {
           repeatMode = 'all queue'
			     queue.setRepeatMode(2);
		     } else if (queue.repeatMode === 2) {
           repeatMode = 'autoplay'
           queue.setRepeatMode(3);
         } else if (queue.repeatMode === 3) {
           repeatMode = 'off'
           queue.setRepeatMode(0);
         }
         var songembed = new Discord.EmbedBuilder()
           .setColor("BLACK")
           .setDescription(`Now playing- [**${queue.current.title}**](${slink}) 🎧
next song- \`\`${queue.tracks[0] ? queue.tracks[0].title : "no more song"}\`\`
${queue.createProgressBar({timecodes: true, indicator: "●", length: 20})}
**volume** \`\`${queue.volume}%\`\`                    **repeat** \`\`${repeatMode}\`\`                    **support** [link](${config.serverinvite})`)
           .setThumbnail(`${queue.current.thumbnail}`)
           .setFooter({
            text: "Requested by: " + `${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`, 
            iconURL: `https://cdn.discordapp.com/avatars/${queue.current.requestedBy.id}/${queue.current.requestedBy.avatar}.webp?size=240`
          })
            .setImage(config.icwflahimg)
            .setTimestamp();
            
            await i.deferUpdate()
            await i.message.edit({ embeds: [songembed], components: [row1, row2] , ephemeral : true});
       }
     })
     
/*             VOLUME +                 */

     const filter6 = i => i.customId === 'volinc' && i.user.id === message.member.user.id;

     const collector6 = sentMessage.createMessageComponentCollector({ filter6, /*time: 50000 */});

     collector6.on('collect', async i => {
       if (i.customId === 'volinc') {
         if (!queue || !queue.playing) return;
         var vol;
         if (await queue.volume < 100) {
           vol = parseInt(queue.volume) + 10;
         } else {
           vol = 0;
         }
         
         var songembed = new Discord.EmbedBuilder()
           .setColor("BLACK")
           .setDescription(`Now playing- [**${queue.current.title}**](${slink}) 🎧
next song- \`\`${queue.tracks[0] ? queue.tracks[0].title : "no more song"}\`\`
${queue.createProgressBar({timecodes: true, indicator: "●", length: 20})}
**volume** \`\`${vol}%\`\`                    **repeat** \`\`${queue.repeatMode === 1 ? "one song"  : queue.repeatMode === 2 ? "all queue"  : queue.repeatMode === 3 ? "autoplay" : "off"}\`\`                    **support** [link](${config.serverinvite})`)
           .setThumbnail(`${queue.current.thumbnail}`)
           .setFooter({
            text: "Requested by: " + `${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`, 
            iconURL: `https://cdn.discordapp.com/avatars/${queue.current.requestedBy.id}/${queue.current.requestedBy.avatar}.webp?size=240`
          })
            .setImage(config.icwflahimg)
            .setTimestamp();
            
            await i.deferUpdate()
            await queue.setVolume(parseInt(vol))
            await i.message.edit({ embeds: [songembed], components: [row1, row2] , ephemeral : true});
       }
     })
     
/*             VOLUME -                 */

     const filter7 = i => i.customId === 'voldec' && i.user.id === message.member.user.id;

     const collector7 = sentMessage.createMessageComponentCollector({ filter7, /*time: 50000 */});

     collector7.on('collect', async i => {
       if (i.customId === 'voldec') {
         if (!queue || !queue.playing) return;
         var vol;
         if (queue.volume > 0) {
           vol = parseInt(queue.volume) - 10;
         } else {
           vol = 100;
         }
         var songembed = new Discord.EmbedBuilder()
           .setColor("BLACK")
           .setDescription(`Now playing- [**${queue.current.title}**](${slink}) 🎧
next song- \`\`${queue.tracks[0] ? queue.tracks[0].title : "no more song"}\`\`
${queue.createProgressBar({timecodes: true, indicator: "●", length: 20})}
**volume** \`\`${vol}%\`\`                    **repeat** \`\`${queue.repeatMode === 1 ? "one song"  : queue.repeatMode === 2 ? "all queue"  : queue.repeatMode === 3 ? "autoplay" : "off"}\`\`                    **support** [link](${config.serverinvite})`)
           .setThumbnail(`${queue.current.thumbnail}`)
           .setFooter({
            text: "Requested by: " + `${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`, 
            iconURL: `https://cdn.discordapp.com/avatars/${queue.current.requestedBy.id}/${queue.current.requestedBy.avatar}.webp?size=240`
          })
            .setImage(config.icwflahimg)
            .setTimestamp();
            
            await i.deferUpdate()
            await queue.setVolume(parseInt(vol))
            await i.message.edit({ embeds: [songembed], components: [row1, row2] , ephemeral : true});
       }
     })
     
/*             VOLUME MUTE                 */

     const filter8 = i => i.customId === 'volmute' && i.user.id === message.member.user.id;

     const collector8 = sentMessage.createMessageComponentCollector({ filter8, /*time: 50000 */});

     collector8.on('collect', async i => {
       if (i.customId === 'volmute') {
         if (!queue || !queue.playing) return;
         var vol;
         if (queue.volume === 0) {
           vol = parseInt(100);
         } else {
           vol = 0;
         }
         
         var songembed = new Discord.EmbedBuilder()
           .setColor("BLACK")
           .setDescription(`Now playing- [**${queue.current.title}**](${slink}) 🎧
next song- \`\`${queue.tracks[0] ? queue.tracks[0].title : "no more song"}\`\`
${queue.createProgressBar({timecodes: true, indicator: "●", length: 20})}
**volume** \`\`${vol}%\`\`                    **repeat** \`\`${queue.repeatMode === 1 ? "one song"  : queue.repeatMode === 2 ? "all queue"  : queue.repeatMode === 3 ? "autoplay" : "off"}\`\`                    **support** [link](${config.serverinvite})`)
           .setThumbnail(`${queue.current.thumbnail}`)
           .setFooter({
            text: "Requested by: " + `${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`, 
            iconURL: `https://cdn.discordapp.com/avatars/${queue.current.requestedBy.id}/${queue.current.requestedBy.avatar}.webp?size=240`
          })
            .setImage(config.icwflahimg)
            .setTimestamp();
            
            await i.deferUpdate()
            await queue.setVolume(parseInt(vol))
            await i.message.edit({ embeds: [songembed], components: [row1, row2] , ephemeral : true});
       }
     })
     
}

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: ['pl'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'player',
	category: 'music1',
	description: 'for easy control on music with buttons',
	usage: '$player'
}
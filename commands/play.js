const Discord = require("discord.js");
const config = require("../config.js");
//const ytdl = require("ytdl-core");
const yts = require("yt-search");
//const ytpl = require("ytpl");
const nsfwword = require("../nsfwword");
const { QueryType } = require('discord-player');

exports.run = async (bot, message, args, command, db) => {
  //const serverQueue = bot.songQueue.get(message.guild.id);
  const songselection = (await db.ref(`servers/${message.guild.id}`).child("songselection").once("value")).val();
  const songlistlimit = (await db.ref(`servers/${message.guild.id}`).child("songlistlimit").once("value")).val();
  const defvolume = (await db.ref(`servers/${message.guild.id}`).child('defvolume').once('value')).val();
  
  const logswitch = (await db.ref(`servers/${message.guild.id}`).child('logswitch').once('value')).val();
  const logchannelid = (await db.ref(`servers/${message.guild.id}`).child('logchannelid').once('value')).val();
  const autoleave = (await db.ref(`servers/${message.guild.id}`).child('autoleave').once('value')).val();
  const autojoin = (await db.ref(`servers/${message.guild.id}`).child('autojoin').once('value')).val();
  const altime = (await db.ref(`servers/${message.guild.id}`).child('altime').once('value')).val();
  
  const autoplay = (await db.ref(`users/${message.author.id}`).child('autoplay').once('value')).val();
  const apch = (await db.ref(`users/${message.author.id}`).child('apch0').once('value')).val();
  const apch2 = (await db.ref(`users/${message.author.id}/apch`).child('apch2').once('value')).val();
  const apsong = (await db.ref(`users/${message.author.id}`).child('apsong').once('value')).val();

  const sselect = songlistlimit ? songlistlimit : 5;
  const voiceChannel = message.member.voice.channel;

  let args0 = args.join("").substring(command.length);
  let searchString = args0.slice();
  const url = args0 ? args0.replace(/<(.+)>/g, "$1") : "";

  if (!voiceChannel)
    return message.channel.send({
      content:"You are not in a voice channel please join a channel and use this command again",
    });

  if (!url)
    return message.channel.send({content: `❌ input a song name, song link or playlist link after command`,});

  let c = url.split(" ").filter((e) => nsfwword.adultsword.includes(e));

  if (c.length > 0)
    return message.channel.send(" >>> dont use bad word please");

  const permissions = voiceChannel.permissionsFor(message.client.user);

  if (!permissions.has("CONNECT"))
    return message.channel.send({content:"I do not have the permissions to join that voice channel please give me permissions to join",});

  if (!permissions.has("SPEAK"))
    return message.channel.send({content:"I do not have the permissions to speak in that voice channel please give me permissions to speak",});

  let queue = bot.player.getQueue(message.guild.id);
  
  const searchResult = await bot.player
    .search(url, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO
    }).catch(() => {
      console.log('he');
    });
  if (!searchResult || !searchResult.tracks.length) return void message.channel.send({ content: 'No results were found!' });
//console.log(searchResult.playlist)

  if (searchResult.playlist) {
    const queue = await bot.player.createQueue(message.guild, {
      ytdlOptions: {
        filter: 'audioonly',
        highWaterMark: 1 << 30,
        dlChunkSize: 0,
      }, metadata: message.channel,
      volumeSmoothness: "",
      bufferingTimeout: 0,
      leaveOnEmpty: false
    });
    const member = message.guild.members.cache.get(message.author.id) ?? await message.guild.members.fetch(message.author.id);
    try {
      if (!queue.connection) await queue.connect(member.voice.channel);
    } catch {
      void bot.player.deleteQueue(message.guild.id);
      return void message.channel.send({ content: 'Could not join your voice channel!' });
    }
    
    queue.addTracks(searchResult.tracks)
    if (!queue.playing) await queue.play();
    message.channel.send({content:`Playlist: **${searchResult.playlist.title}** has been added  to the queue!`});
  } else {
    if (songselection === true) {
      //console.log(searchResult)
      const tracks2 = await searchResult.tracks.slice(0, sselect).map(t => t)
      //console.log(tracks2)
      var songList = "";
      for (var i = 0; i < searchResult.tracks.slice(0, sselect).length; i++) {
        songList += await `${i + 1}. [${searchResult.tracks[i].title}](${searchResult.tracks[i].url}) \n`
        //console.log(songList)
      }
      //console.log(songList)
      var embed = new Discord.EmbedBuilder()
        .setAuthor({
          name: "ICW BOT",
          iconURL: `${config.icwflashlogo}`
        })
        .setDescription(`__**Song selection:**__
${songList}
Please provide a value to select one of the search results ranging from 1-${sselect - 1}.
                
\`\`you can turn on/off song selection with command ${config.prefix}songselect\`\``)
        .setImage(config.icwflahimg)
        .setFooter({
          text: `${bot.user.username}™ | Developed by: PK#1650 `,
          iconURL: `${config.pkflashlogo}`
        })
        .setColor("BLACK")
        .setTimestamp();
      message.channel.send({ embeds: [embed] }).then(msg => {
      const filter = (message2) => message2.content > 0 && message2.content < sselect;

      try {
        msg.channel.awaitMessages({
          filter, 
          max: 1,
          time: 20000,
          errors: ["time"]
        }).then(async collected => {
          const videoIndex = parseInt(collected.first())
          const video3 = tracks2[videoIndex - 1];
          
          const queue = await bot.player.createQueue(message.guild, {
            ytdlOptions: {
                filter: 'audioonly',
                highWaterMark: 1 << 30,
                dlChunkSize: 0,
            },
            metadata: message.channel,
            volumeSmoothness: "",
            bufferingTimeout: 0,
            leaveOnEmpty: false
        });
          
        const member = message.guild.members.cache.get(message.author.id) ?? await message.guild.members.fetch(message.author.id);
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void bot.player.deleteQueue(message.guild.id);
            return void message.channel.send({ content: 'Could not join your voice channel!' });
        }
          if (queue.tracks <= 0) return queue.play(video3)
          queue.addTracks(video3)
          if(!queue.playing) await queue.play();

        }).catch(error => {
          return message.channel.send({content:"No or invalid value entered, cancelling video selection."});
        });
      } catch (err) {
        return message.channel.send({content:"No or invalid value entered, cancelling video selection."})
      }
      })
    } else {
      const queue = await bot.player.createQueue(message.guild, {
        ytdlOptions: {
          filter: 'audioonly',
          highWaterMark: 1 << 30,
          dlChunkSize: 0,
        }, metadata: message.channel,
        volumeSmoothness: "",
        bufferingTimeout: 0,
        leaveOnEmpty: false
        //leaveOnEmpty:  autoleave ? true : false,
        //leaveOnEmptyCooldown: altime ? altime : 5000
      });
      const member = message.guild.members.cache.get(message.author.id) ?? await message.guild.members.fetch(message.author.id);
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void bot.player.deleteQueue(message.guild.id);
            return void message.channel.send({ content: 'Could not join your voice channel!' });
        }
        if (queue.tracks <= 0) return queue.play(searchResult.tracks[0]);

        //await message.channel.send({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
        queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
        }
      }
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["p", "yt"],
  permLevel: "No permission need",
  manu: false,
};

exports.help = {
  name: "play",
  category: "music",
  description: "for playing music",
  usage: "$pp songname",
};
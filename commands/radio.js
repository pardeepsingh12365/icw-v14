const Discord = require('discord.js');
const config = require("../config.js");
const { QueryType, Track } = require('discord-player');
const radiomodule = require('../modules/radioStations');
exports.run = async (bot, message, args, command, db) => {
  const radio = radiomodule.radios.stations

  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();

  if (radio.find(d => d.name === c || d.radioes === c)){
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send({content:"You are not in a voice channel please join a channel and use this command again"});
    let matched = radio.find(v => v.name === c || v.aliases === c)

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
    //if (queue.tracks <= 0) return
    const track = new Track(bot.player,{
      id: matched.id,
      title: `${matched.title} (${matched.lang})`,
      author: matched.name,
      url: matched.url,
      thumbnail: matched.thumbnail,
      duration: '0:00',
      views: 0,
      requestedBy: message.author,
      playlist: null,
      source: 'arbitrary',
      engine: matched.url
    })
    try {
      queue.play(track,{immediate: true});
    } catch (error) {
      message.channel.send({content: `Error: ${error}`})
    }

    //await message.channel.send({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
    //searchResult.playlist ? await queue.addTracks(searchResult[0].tracks) : queue.addTrack(searchResult.tracks[0]);
    //if (!queue.playing) await queue.play();

  } else {
    let radioembed = new Discord.EmbedBuilder()
    .setColor("BLACK")
    ///.setAuthor("ICW RADIO", `${config.icwflashlogo}`)
    .setThumbnail("https://cdn.discordapp.com/attachments/640098613665726464/648130054345195520/download_1.jpg")
    .setDescription(`${config.r} ${config.a} ${config.d} ${config.i} ${config.o}

this is the **real radio stream**\nin hindi, english, punjabi or more lang.
**stations list:-**
${radio.sort((a,b) => (a.lang > b.lang) ? 1 : ((b.lang > a.lang) ? -1 : 0)).map(s => `${s.name} \`\`(${s.lang})\`\``).join("\n")}

usase **${config.prefix}radio <station>** \`\`like:- ${config.prefix}radio capital\`\`
\`\`some station buffering slowly(max 10sec) so be patient\`\`
\`\`note: you can request for add a radio station on\`\` [support](https://discord.gg/zFDvBay) \`\`server.\`\`
`)
    .setImage(config.icwflahimg)
    .setFooter({
      text: `${bot.user.username}™ | Developed by: PK#1650 `,
      iconURL: `${config.pkflashlogo}`
    })
    .setTimestamp()

    message.channel.send({embeds: [radioembed]})
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['fm'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'radio',
	category: 'music',
	description: 'for playing radio on music player',
	usage: '$radio'
}
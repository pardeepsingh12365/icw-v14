const Discord = require('discord.js')
const config = require("../config.js");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(process.env.GOOGLEAPIKEY);
exports.run = async (bot, message, args, command, db) => {
  
  const serverQueue = bot.songQueue.get(message.guild.id);
  const songselection = (await db.ref(`servers/${message.guild.id}`).child('songselection').once('value')).val();
  const songlistlimit = (await db.ref(`servers/${message.guild.id}`).child('songlistlimit').once('value')).val();
  const sselect = songlistlimit ? songlistlimit + 1 : 6

        const voiceChannel = message.member.voice.channel;
        let args0 = args.join("").substring(command.length);
        let searchString = args0.slice();
  
        const url = args0 ? args0.replace(/<(.+)>/g, '$1') : '';
        if (!voiceChannel) return message.channel.send("You are not in a voice channel please join a channel and use this command again");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send("I do not have the permissions to join that voice channel pleae give me permissions to join");
        if (!permissions.has("SPEAK")) return message.channel.send("I do not have the permissions to speak in that voice channel pleae give me permissions to join");
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            //await message.cahnnel.send(`✅ Playlist: **${playlist.title}** has been added  to the queue!`);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
               //console.log(video.raw.status.privacyStatus)// !== 'public') continue;
                const video2 = await youtube.getVideoByID(video.id);
                await bot.addSong(message, video2, voiceChannel, true);
            }
            return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, sselect - 1);
                  if (songselection === true) {
                    let index = 0;
                    var embed = new Discord.MessageEmbed()
                    .setAuthor("ICW BOT",`${config.icwflashlogo}`)
                    .setDescription(`__**Song selection:**__
${videos.map(video2 => `**${++index} - **[${video2.title}](https://www.youtube.com/watch?v=${video2.id})`).join('\n')}
Please provide a value to select one of the search results ranging from 1-${sselect - 1}.
\`\`you can turn on/off song selection with command ${config.prefix}songselect\`\`
`)
                    .setImage(config.icwflahimg)
                    .setFooter(`${bot.user.username}™ | Developed by: PK#1650 `, `${config.pkflashlogo}`)
                    .setColor("RANDOM")
                    .setTimestamp();
                    message.channel.send({embed: embed})
              try {
                var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < sselect, {
                  max: 1,
                  time: 20000,
                  errors: ['time']
                });
              } catch (err) {
                return message.channel.send('No or invalid value entered, cancelling video selection.');
              }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } else {
                      var video = await youtube.getVideoByID(videos[0].id);
                    }
                    
                } catch (err) {
                    console.error(err);
                    bot.channels.cache.get(config.boterrorchannel).send(`${message.author.tag} from ${message.guild.name} trying to use play command but i got a error ${err}`)
                    return message.channel.send('🆘 I could not obtain any search results.');
                }
            }
            return bot.addSong(message, video, voiceChannel);
          
        }
    
}

async function addSong(message, video, voiceChannel, playlist = false) {
	  const songQueue = new Map()
	  const serverQueue = songQueue.get(message.guild.id);
	  const song = {
		  id: video.id,
        title: /*Util.escapeMarkdown(*/ video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        duration: `${video.duration.hours}:${video.duration.minutes}:${video.duration.seconds}`,
        thumbnail: video.thumbnails.high.url,
        author: video.author = message.author,
        user: message.author.username,
        usravatar: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})
	  };
  }

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: [],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'pp',
	category: 'music2',
	description: 'for playing music',
	usage: '$pp songname'
}
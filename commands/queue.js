const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => {
  let queue = bot.player.getQueue(message.guild.id);
  
  if (!message.guild.members.me.voice.channel) return message.channel.send({content:"bot is not in voice channel and nothing to play"}, { reply: message });
  if (!queue || !queue.playing) return message.channel.send({content:'No song in the queue'})
  var i = 2
  var songList = queue.tracks.slice(0,4).map(t => `${i++}. [${t.title}](${t.url.startsWith(`https://www.youtube.com`) ? t.url : config.serverinvite})`).join('\n')
  if (songList.length < 1950) {
    var queueembed = new Discord.EmbedBuilder()
    .setColor("BLACK")
    .setAuthor({
      name:"The song queue of " + message.guild.name + " currently has:",
      iconURL: message.guild.iconURL({ format: 'png', dynamic: true, size: 1024}) == null ? "https://images-ext-1.discordapp.net/external/v1EV83IWPZ5tg7b5NJwfZO_drseYr7lSlVjCJ_-PncM/https/cdn.discordapp.com/icons/268683615632621568/168a880bdbc1cb0b0858f969b2247aa3.jpg?width=80&height=80" : message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })
    })
    .setDescription(`${config.p} ${config.l} ${config.a} ${config.y} ${config.l} ${config.i} ${config.s} ${config.t}\n
1. __**[${queue.current.title}](${queue.current.url.startsWith(`https://www.youtube.com`) ? queue.current.url : config.serverinvite})**__

${songList}
total **${queue.tracks.length + 1}** songs.`)
    .setFooter({
      text: "Developed by: PK#1650 ",
      iconURL: `${config.pkflashlogo}`
    })
    .setImage(config.icwflahimg)
    .setTimestamp();
    message.channel.send({ embeds: [queueembed] });
  } else {
    message.channel.send(`${songList.split("\n").slice(queue.data.currentSongIndex, queue.data.currentSongIndex+5).join("\n")}`, { split: "\n" });
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['q', 'playlist'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'queue',
	category: 'music',
	description: 'for check playlist',
	usage: '$queue'
}
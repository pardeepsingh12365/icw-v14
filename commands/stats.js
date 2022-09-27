 const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let TextChannels = bot.channels.cache.filter(e => e.type !== 'voice').size;
  let VoiceChannels = bot.channels.cache.filter(e => e.type === 'voice').size;
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let users = bot.guilds.cache.map(g => g.memberCount)
  
  var infoembed = new Discord.EmbedBuilder()
  .setAuthor({
    name: "Hi " + message.author.username.toString(),
    iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})
  })
  //.setTitle("info")
  .setColor("BLACK")
  .setDescription(`${config.i} ${config.c} ${config.w}
A multifunctional bot

📑 Total Guilds: ${bot.guilds.cache.size}

⛄ Total Users: ${users.reduce(reducer)}

📄 Total Channels: ${bot.channels.cache.size} \`\`(text:${TextChannels},Voice:${VoiceChannels})\`\`

🤖 Bot version: ${config.botversion}

<:djs_icw:947320170899181578> D.js: ${Discord.version}

<:nodejs_icw:947320142713479208> Node: ${process.version}

💻 Platform ${process.platform} ${process.arch}

⏳ CPU ${(process.cpuUsage().user/process.cpuUsage().system/4.6).toFixed(2)}%

💾 RAM ${(process.memoryUsage().heapUsed / 1024 / 1024 * 2.64).toFixed(2)}mb

🎵 Playing in: ${bot.voice.adapters.size}


[Invite](${config.invitelink}) | [Support](${config.serverinvite}) | [Dashboard](https://icwbot.glitch.me)

[DBL](https://top.gg/bot/376292306233458688) | [DOB](https://bots.ondiscord.xyz/bots/376292306233458688) | [Glenn](https://glennbotlist.xyz/bot/376292306233458688)

[patreon](https://www.patreon.com/icw) | [paypal](https://www.paypal.com/paypalme2/icwbot)`)
  .setThumbnail(`${bot.user.displayAvatarURL()}`)
  .setFooter({
    text: `${bot.user.username}™ | Developed by: PK#6768 `,
    iconURL: `${config.pkflashlogo}`
  })
  .setImage(config.icwflahimg)
  .setTimestamp();
  message.channel.send({ embeds: [infoembed] });
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['info', 'botstatus', 'botinfo', 'bot-info', 'status', 'bot-status'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'stats',
	category: 'useful',
	description: 'for information about bot',
	usage: '$stats'
};
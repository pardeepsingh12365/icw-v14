const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  var g = message.guild
  let online = g.members.cache.filter(m => m.presence?.status === "online").size
  let idle = g.members.cache.filter(m => m.presence?.status === "idle").size
  let dnd = g.members.cache.filter(m => m.presence?.status === "dnd").size
  let offline = g.members.cache.filter(m => m.presence === null).size

  var membersembed = new Discord.EmbedBuilder()
  .setColor("BLACK")
  .setDescription(`${config.m} ${config.e} ${config.m} ${config.b} ${config.e} ${config.r}  ${config.c} ${config.o} ${config.u} ${config.n} ${config.t}\n
member's of ${g.name}
${message.guild.memberCount}  ( :green_circle:${online} :yellow_circle:${idle} :red_circle:${dnd} :black_circle:${offline})`)
  .setFooter({
    text: "Bot Developed by: PK#6768 ",
    iconURL: `${config.pkflashlogo}`})
  .setImage(config.icwflahimg)
  .setTimestamp();
  message.channel.send({ embeds: [membersembed] });
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['mcount','usercount'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'membercount',
	category: 'useful',
	description: 'for check total member of a server',
	usage: '$membercount'
};
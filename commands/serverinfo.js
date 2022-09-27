const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let g = message.guild;
  let guildTchannels = g.channels.cache.filter(e => e.type !== 'voice').size;
  let guildVchannels = g.channels.cache.filter(e => e.type === 'voice').size;
  let serveronlinemembers = g.members.cache.filter(m => m.presence?.status !== "offline").size;
  let serveroflinemembers = g.members.cache.filter(m => m.user.presence?.status === "offline").size;

  let sicon = g.iconURL() == null ? "https://images-ext-1.discordapp.net/external/v1EV83IWPZ5tg7b5NJwfZO_drseYr7lSlVjCJ_-PncM/https/cdn.discordapp.com/icons/268683615632621568/168a880bdbc1cb0b0858f969b2247aa3.jpg?width=80&height=80" : message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 });

  let online = g.members.cache.filter(m => m.presence?.status === "online").size
  let idle = g.members.cache.filter(m => m.presence?.status === "idle").size
  let dnd = g.members.cache.filter(m => m.presence?.status === "dnd").size
  let offline = g.members.cache.filter(m => m.presence?.status === "offline").size
  
  var serverinfoembed = new Discord.EmbedBuilder()
  .setAuthor({
    name: g.name + "info",
    iconURL: sicon
  })
  .setColor("BLACK")
  .setDescription(`${config.s} ${config.e} ${config.r} ${config.v} ${config.e} ${config.r} ${config.i} ${config.n} ${config.f} ${config.o}\n
${g.description ? `${g.description}\n` : ""}
Since: ${g.createdAt}`)
  .addFields([
    {name: "Server Owner:",value: `<@${g.ownerId}>`, inline: true},
    {name: "Owner id:",value: `${g.ownerId ? g.ownerId : null}`, inline: true},
    {name: "Total Roles:",value: `${g.roles.cache.size}`, inline: true},
    {name: "Text channel:",value: `${guildTchannels}`, inline: true},
    {name: "Voice channels:",value: `${guildVchannels}`, inline: true},
    {name: "Splash",value: g.splashURL() ? `[link](${g.splashURL({ format: 'png', dynamic: true, size: 256})})` : "No splash", inline: true},
    {name: "Banner",value: g.bannerURL() ? `[link](${g.bannerURL({ format: 'png', dynamic: true, size: 256})})` : "No banner", inline: true},
    {name: "Server Region:",value: `${g.preferredLocale}`, inline: true},
    {name: "Verification Level",value:`${g.verificationLevel}`, inline: true},
    {name: "MFA Level",value: `${g.mfaLevel === 1 ? `ELEVATED` : "NONE"}`, inline: true},
    {name: "Premium Tier",value:  g.premiumTier ? `${g.premiumTier}` : `${null}`, inline: true},
    {name: "Premium Subscribers",value: g.premiumSubscriptionCount ? `${g.premiumSubscriptionCount}` : "null", inline: true},
    {name: "Server id",value: `${message.guild.id}`},
    {name: "Members:",value: `${message.guild.memberCount} (:green_circle:${online} :yellow_circle:${idle} :red_circle:${dnd} :black_circle:${offline})`},
    {name: "Features",value: `${message.guild.features.length !== 0 ? `:white_check_mark: ${message.guild.features.join('\n:white_check_mark: ')}` : "null"}`}
    ])
  .setThumbnail(sicon)
  .setFooter({
    text: "Bot Developed by: PK#1650 ",
    iconURL: `${config.pkflashlogo}`
  })
  .setImage(config.icwflahimg)
  .setTimestamp();
  message.channel.send({ embeds: [serverinfoembed] });
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['guildinfo','guild-info', 'server-info','sinfo'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'serverinfo',
	category: 'useful',
	description: 'info about server',
	usage: '$serverinfo'
};
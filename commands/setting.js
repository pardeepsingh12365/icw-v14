const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  const gprefix = (await db.ref(`servers/${message.guild.id}`).child("guildprefix").once("value")).val();
  const welcomeMstatus = (await db.ref(`servers/${message.guild.id}`).child('welcomeMstatus').once('value')).val();
  const wleavetextonoff = (await db.ref(`servers/${message.guild.id}`).child('wleavetextonoff').once('value')).val();
  const easymode = (await db.ref(`servers/${message.guild.id}`).child('easymode').once('value')).val();
  const autojoin = (await db.ref(`servers/${message.guild.id}`).child('autojoin').once('value')).val();
  const autoleave = (await db.ref(`servers/${message.guild.id}`).child('autoleave').once('value')).val();
  const altime = (await db.ref(`servers/${message.guild.id}`).child('altime').once('value')).val();
  const defvolume = (await db.ref(`servers/${message.guild.id}`).child('defvolume').once('value')).val();
  const autorole = (await db.ref(`servers/${message.guild.id}`).child('autorole').once('value')).val();
  const arrole = (await db.ref(`servers/${message.guild.id}`).child('arrole').once('value')).val();
  const wchannelid = (await db.ref(`servers/${message.guild.id}`).child('wchannelid').once('value')).val();
   let args3 = args.join("").substring(command.length).split(" ");
  
  let embed = new Discord.EmbedBuilder()
  .setAuthor({
    name: message.guild.name,
    iconURL: message.guild.iconURL({ format: 'png', dynamic: true, size: 256})
  })
  .setColor("BLACK")
  .setDescription(`${config.s} ${config.e} ${config.t} ${config.t} ${config.i} ${config.n} ${config.g} ${config.s}
General Settings
prefix : **${gprefix ? `${gprefix}` : `${config.prefix}`}**
welcome : **${welcomeMstatus ? "on" : "off"}**
goodbye : **${wleavetextonoff ? "on" : "off"}**
welcome & goodbye channel : **${wchannelid ? `<#${wchannelid}>` : `No Channel`}**
Channels and Roles
auto-role : **${autorole ? "on" : "off"}**
auto-role role : **${arrole ? `<@&${arrole}>` : `No Role`}**
Voice and Music
easymode : **${easymode ? "on" : "off"}**
auto-join voice : **${autojoin ? "on" : "off"}**
auto-leave voice : **${autoleave ? "on" : "off"}**
Leaving voice after : **${altime ? `${altime / 1000}` : `120`} Seconds**
Default volume : **${defvolume ? `${defvolume}` : `100`}%**`)
  .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024}))
  .setImage(config.icwflahimg)
  .setFooter({
    text: `${bot.user.username}™ | Developed by: PK#6768 `,
    iconURL: `${config.pkflashlogo}`
  })
  .setTimestamp()

 message.channel.send({embeds: [embed]});
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['ssetting', 'serversetting','guildsetting'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'setting',
	category: 'settings',
	description: 'for check current settings of your server',
	usage: '$setting'
};
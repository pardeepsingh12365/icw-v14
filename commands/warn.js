const Discord = require('discord.js');
const config = require("../config.js");
exports.run = async (bot, message, args, command, db) => {
  if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
  let warnUser = message.mentions.members.first();
  if (!warnUser) return message.channel.send({content:`Specify a user to warn`});
  let args2 = message.content.substring(config.prefix.length + 4).split(`<@${warnUser.user.id}>`);
  let reason = args2.join(" ").substring(3);
  if (!reason) return message.channel.send({content:"You did not give a reason to warn the user."});
  if (!warnUser.id == message.author.id) return message.channel.send({content:"You cannot warn yourself/!"});
    message.delete().catch(err => bot.channels.cache.get(config.botrejectionschannel).send({content:`${message.author.username} from ${message.guild.name} using warn command \n${err}`}))
    warnUser.send({content:`**you have been warned from** ${message.guild}. \n**Reason**: ${reason}`}).catch(err => {});
  message.channel.send({content:`***${warnUser.user.tag} has been warned***`})
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['warnuser', 'warn-user'],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'warn',
	category: 'modration',
	description: 'for warn a user',
	usage: '$warn @user'
};
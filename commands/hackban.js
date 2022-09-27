const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let args3 = args.join().substring(command.length).split(" ");
  if (isNaN(args3[0]) || args3[0].length !== 18) return message.channel.send({content:`input id not valid`})

  if (!message.guild.member(bot.user).permissions.has("BAN_MEMBERS")) return message.channel.send({content:`I don't have permission to do that`});
  if (message.author.id !== config.botowner && !message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({content:`You don't have permission to do that`});
  let banUser = args3[0];
  if (!banUser) return message.channel.send({content:`Specify a user to ban`});

  let arg = args.join("").substring(command.length)
  let reason = args3[1]  ? arg.substr(arg.indexOf(' ') + 1) : 'No reason';

  if (banUser === message.author.id) return message.channel.send({content:"You cannot ban yourself/!"});
  //if (!banUser.bannable) return message.channel.send("my role is either the same or lower than the user you wish to ban.\nand user is not valid");
  try {
      bot.users.cache.get(banUser).send({content:`**You have been baned from** ${message.guild}. \n**Reason**: ${reason}`}).catch(err => {});
  } catch (err) {
    message.channel.send({content:`I failed to send the private message to the user...\nReason: ${err}`}).then(m => m.delete({ timeout: 5000, reason: 'It had to be done.' }));
  }
  try {
    message.guild.members.ban(banUser);
    var banembed = new Discord.EmbedBuilder()
    .setColor("RED")
    .setAuthor({
      name: "Action by : " + message.author.username.toString(),
      iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})
    })
    .setDescription(`${config.h} ${config.a} ${config.c} ${config.k} ${config.b} ${config.a} ${config.n}
**Action**: hackban \n**Mamber**: (${banUser}) \n**Reason**: ${reason}`)
    .setImage(config.icwflahimg)
    .setFooter({
      text: `${bot.user.username}™ | Developed by: PK#1650 `,
      iconURL: `${config.pkflashlogo}`
    })
    .setTimestamp();
    message.channel.send({ embeds: [banembed] });
  } catch (err) {
    message.channel.send({content:`I failed to ban the user... Reason: ${err}`}).then(m => m.delete({ timeout: 5000, reason: 'It had to be done.' }));
  }
}

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: ['hack-banuser','hack-ban'],
	permLevel: 'BAN_MEMBERS',
  manu: false
};

exports.help = {
	name: 'hackban',
	category: 'modration',
	description: 'for hackban a user only with user id,s',
	usage: '$hackban <@user> <reason>'
};
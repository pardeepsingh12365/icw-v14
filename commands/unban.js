const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let arg = args.join("").substring(command.length);
  //let arg2 = arg.slice(" ").trim().split(/ +/g).join(" ")
  
  if (!message.guild.member(bot.user).permissions.has("BAN_MEMBERS")) return message.channel.send({content:`I don't have permission to do that`});
  if (message.author.id !== config.botowner && !message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({content:`You don't have permission to do that`});
  
  let userId = arg.split(" ")[0]
  if (!userId) return message.channel.send({content:`inpit a id please`});
  if (isNaN(userId) || userId.length !== 18) return message.channel.send({content:`❌ invalid user id`})
  let reason = arg.substring(userId.length + 1);
  if (!userId == message.author.id) return message.channel.send({content:"its your id dumb/!"});
  //bot.users.cache.get(userId).send(`**You are unbaned from** ${message.guild}. \n**Reason**: ${reason ? reason : "No reason"}`).catch(err => {});
  try {
    message.guild.members.unban(userId, {reason: reason ? reason : "No reason"}).then(async user => {
    var unbanembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor("Action by : " + message.author.username.toString(), message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
    .setDescription(`${config.u} ${config.n} ${config.b} ${config.a} ${config.n} ${config.e} ${config.d}
**Action**: unban \n**Mamber**: ${user.username} (${user.id}) \n**Reason**: ${reason ? reason : "No reason"}`)
    .setImage(config.icwflahimg)
    .setTimestamp();
    message.channel.send({ embeds: [unbanembed] });
      
    const logswitch = (await db.ref(`servers/${message.guild.id}`).child('logswitch').once('value')).val();
    const logchannelid = (await db.ref(`servers/${message.guild.id}`).child('logchannelid').once('value')).val();
    
    if (logswitch) {
      let logch = message.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
      } else {
        logch.send({ embeds: [unbanembed] })
      }
      
    }
    }).catch(error => {
      message.channel.send({content:`❌ ${error}`})
    })
  } catch (err) {
    message.channel.send({content:`I failed to unban the user... Reason: ${err}`});
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['unbanuser','unban-user'],
	permLevel: 'BAN_MEMBERS',
  manu: false
};

exports.help = {
	name: 'unban',
	category: 'modration',
	description: 'for unban a user',
	usage: '$unban <userid> <reason>'
};
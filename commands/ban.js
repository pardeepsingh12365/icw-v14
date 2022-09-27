const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let arg = args.join().substring(command.length);
  let arg2 = arg.split(" ")[0]
  if (!arg2) return message.channel.send({content:`❌ DiscordAPIError: invalid input`})
  
  if (!message.guild.members.me.permissions.has("BAN_MEMBERS")) return message.channel.send({content:`I don't have permission to do that`});
  if (message.author.id !== config.botowner && !message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({content:`You don't have permission to do that`});
  let banUser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username === arg2 || m.user.id === arg2);
  if (!banUser) return message.channel.send({content:`❌ invalid input! please specify a user to ban`});
  let arg3 = arg.split(`<@${banUser.user.id}>`).join().substring(2);
  if (!banUser.id == message.author.id) return message.channel.send({content:"You cannot ban yourself/!"});
  if (!banUser.bannable) return message.channel.send({content:"my role is either the same or lower than the user you wish to ban."});
  banUser.send({content:`**You have been baned from** ${message.guild}. \n**Reason**: ${arg3 ? arg3 : "No reason"}`}).catch(err => {});
  try {
    message.guild.members.ban(banUser, { days: 1, reason: arg3 ? arg3 : "No reason" });
    var banembed = new Discord.EmbedBuilder()
    .setColor("BLACK")
    .setAuthor({
      name: "Action by : " + message.author.username.toString(),
      iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})
    })
    .setDescription(`${config.b} ${config.a} ${config.n} ${config.e} ${config.d}
**Action**: ban \n**Mamber**: ${banUser.user.tag} (${banUser.id}) \n**Reason**: ${arg3 ? arg3 : "No reason"}`)
    .setImage(config.icwflahimg)
    .setTimestamp();
    message.channel.send({ embeds: [banembed] });
    const logswitch = (await db.ref(`servers/${message.guild.id}`).child('logswitch').once('value')).val();
    const logchannelid = (await db.ref(`servers/${message.guild.id}`).child('logchannelid').once('value')).val();
    if (logswitch) {
      let logch = message.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
      } else {
        logch.send({ embeds: [banembed] })
      }
      
    }
  } catch (err) {
    message.channel.send({content:`I failed to ban the user... Reason: ${err}`});
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['banuser','ban-user'],
	permLevel: 'BAN_MEMBERS',
  manu: false
};

exports.help = {
	name: 'ban',
	category: 'modration',
	description: 'for ban a user',
	usage: '$ban @user reason'
};
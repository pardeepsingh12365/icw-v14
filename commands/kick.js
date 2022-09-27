const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let arg = args.join().substring(command.length);
  if (!message.guild.members.me.permissions.has("KICK_MEMBERS")) return message.channel.send({content:`I don't have permission to do that`});
  if (message.author.id !== config.botowner && !message.member.permissions.has("KICK_MEMBERS")) return message.channel.send({content:`U don't have permission to do that`});
  let kickUser = message.mentions.members.first();
  if (!kickUser) return message.channel.send({content:`Specify a user to kick`});
  let arg3 = arg.split(`<@${kickUser.user.id}>`).join().substring(2);
  if (!kickUser.id == message.author.id) return message.channel.send({content:"You cannot kick yourself/!"});
  if (!kickUser.kickable) return message.channel.send({content:"my role is either the same or lower than the user you wish to kick."});
  kickUser.send({content:`**You have been kicked from** ${message.guild}. \n**Reason**: ${arg3 ? arg3 : "No reason"}`}).catch(err => {});
  try {
    message.guild.member(kickUser).kick(arg3);
    var kickembed = new Discord.EmbedBuilder()
    .setColor("BLACK")
    .setAuthor({
      name: "Action by : " + message.author.username.toString(),
      iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})
    })
    .setDescription(`${config.k} ${config.i} ${config.c} ${config.k} ${config.e} ${config.d}
**Action**: Kick \n**Mamber**: ${kickUser.user.tag} (${kickUser.id}) \n**Reason**: ${arg3 ? arg3 : "No reason"}`)
    .setImage(config.icwflahimg)
    .setTimestamp();
    message.channel.send({ embeds: [kickembed] });
    const logswitch = (await db.ref(`servers/${message.guild.id}`).child('logswitch').once('value')).val();
    const logchannelid = (await db.ref(`servers/${message.guild.id}`).child('logchannelid').once('value')).val();
    if (logswitch) {
      let logch = message.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
      } else {
        logch.send({ embeds: [kickembed] })
      }
      
    }
  } catch (err) {
    message.channel.send({content:`I failed to kick the user... Reason: ${err}e`});
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['kickuser','kick-user'],
	permLevel: 'KICK_MEMBERS',
  manu: false
};

exports.help = {
	name: 'kick',
	category: 'modration',
	description: 'for kick a user',
	usage: '$kick <@user> <reason>'
};
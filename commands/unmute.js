const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let arg = args.join("").substring(command.length);
  console.log("arg "+arg)
  let muser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.id === arg.split(" ")[0]) || message.guild.members.cache.find(m => m.user.username === arg.split(" ")[0])
  console.log("muser "+muser)
  let arg2 = arg.split(arg.split(/ +/g).shift()).join().substring(2);
  console.log("arg2 "+arg2)
  let reason = arg2 ? arg2 : "No reason";
  console.log("reason "+reason)
  if (!message.guild.members.me.permissions.has("MANAGE_ROLES")) return message.channel.send({content:`I don't have permission to do that`});
  if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_ROLES")) return message.channel.send({content:`U don't have permission to do that`});
  if (!muser) return message.channel.send({content:`Specify a user to mute`});
  if (muser.communicationDisabledUntil === null) return message.channel.send({content:'user is already unmuted'})

  var timeoutembed = new Discord.EmbedBuilder()
    .setColor("BLACK")
    .setAuthor({
      name: "Action by : " + message.author.tag.toString(),
      iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})
    })
    .setDescription(`${config.u} ${config.n} ${config.m} ${config.u} ${config.t} ${config.e} ${config.d}\n
**Action**: Unmute \n**Mamber**: ${muser.user.tag} (${muser.id}) \n**Reason**: ${reason}`) 
    .setImage(config.icwflahimg)
    .setFooter({
      text: `${bot.user.username}™ | Developed by: PK#1650 `,
      iconURL: `${config.pkflashlogo}`
    })
    .setTimestamp();
  
  muser.disableCommunicationUntil(null, `${reason}`)
  .then( message.channel.send({embeds: [timeoutembed] }))
  .catch(console.error);

    const logswitch = (await db.ref(`servers/${message.guild.id}`).child('logswitch').once('value')).val();
    const logchannelid = (await db.ref(`servers/${message.guild.id}`).child('logchannelid').once('value')).val();
    if (logswitch) {
      let logch = message.guild.channels.cache.get(logchannelid);
      if (!logch) {
        return undefined;
      } else {
        logch.send({ embeds: [timeoutembed] })
      }
      
    }
    muser.send({content:`**You are unmuted in** ${message.guild} server`}).catch(err => {})
  
}

exports.conf = {
	enabled: false,
	guildOnly: true,
	aliases: ['timeout'],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'unmute',
	category: 'modration',
	description: 'for unmute(remove timeout) someone',
	usage: '$unmute @user reason'
} 
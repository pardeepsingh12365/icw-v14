const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let args2 = args.join('').substring(command.length);
  if (!args2[0]) return message.channel.send({content:`please add message after command like \`\`${config.prefix}say yourmessage\`\``})
  let embed = new Discord.EmbedBuilder()
  .setColor("BLACK")
  .setDescription(`${args2}`)
  
  if (message.channel.type !== 'dm') {
    if (!message.guild.members.cache.get(bot.user.id).permissions.has("MANAGE_MESSAGES")) {
      message.channel.send({embeds: [embed]});
    } else {
      message.delete().catch(err => bot.channels.cache.get(config.botrejectionschannel).send(`${message.author.username} from ${message.guild.name} using say command \n${err}`))
      message.channel.send({embeds: [embed]});
    }
  } else {
    message.channel.send({embeds: [embed]});
  }
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['embed', 'embed-say', 'embedfi'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'embedsay',
	category: 'useful',
	description: 'bot saying your message in embed style',
	usage: '$embedsay message'
};
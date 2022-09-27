const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let args2 = args.join('').substring(command.length);
  if (!args2[0]) return message.channel.send({content:`please add message after command like \`\`${config.prefix}say yourmessage\`\``})
  
  if (message.channel.type !== 'dm') {
    try {
      if (message.guild.members.cache.get(bot.user.id).permissions.has("MANAGE_MESSAGES")) {
        message.delete().catch(err => bot.channels.cache.get(config.botrejectionschannel).send({content:`${message.author.username} from ${message.guild.name} using say command \n${err}`}))
      }
      message.channel.send({content:`${args2}`},{ disableMentions: "everyone"});
    } catch (err) {
      message.author.send({content:`hey <@${message.author.id}> you trying my say command in ${message.guild.name} & i got a error there
❌ ${err}\nThe error has been successfully sent to my developer`})
      bot.channels.cache.get(config.botrejectionschannel).send({content:`❌ ${message.author.username} from ${message.guild.name}(${message.guild.id}) using say command \n${err}`})
    }
  } else {
    message.channel.send({content:`${args2}`});
  }
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['-say'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'say',
	category: 'useful',
	description: 'bot saying your message',
	usage: '$say message'
};
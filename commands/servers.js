const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (!command) return undefined;
  if (message.author.id !== config.botowner) {
        message.channel.send({content:'this command is only for bot owner!!!'});
        return undefined;
  }
  let guilds = bot.guilds.cache.map((guild) => `\`\`${guild.name}\`\` members: ${guild.members.cache.size} id: (${guild.id})`);
  message.channel.send({content:`I'm in the **${bot.guilds.cache.size} guilds**:\n${guilds.join ('\n')}`}, { split: "\n" })
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['bot-servers', 'botservers'],
	permLevel: 'bot owner only',
  manu: false
};

exports.help = {
	name: 'servers',
	category: 'owner-only',
	description: 'for check bot servers',
	usage: '$servers'
};
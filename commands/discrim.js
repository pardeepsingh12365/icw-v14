const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (message.author.id !== config.botowner) {
        message.reply('this command is only for bot owner!!!');
        return undefined;
  }
  const discrim = args.join("").substring(7);
  if (!discrim) return message.reply("oops! I could not find the discriminator that you had given.");
  if (typeof discrim !== 'integer')
    if (discrim.size < 4) return message.reply("Don't you know that discrims are 4 numbers? -.-");
  if (discrim.size > 4) return message.reply("Don't you know that discrims are 4 numbers? -.-");
  let members = bot.users.cache.filter(c => c.discriminator === discrim).map(c => c.username).join(`\n`);
  if (!members) return message.reply("404 | No members have that discriminator!");
  message.channel.send({content:`\`\`\`ICW Discrim Finder\nI found these discriminators.\n\n${members}#${discrim}\`\`\``}, { split: "\n" });
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['discriminator'],
	permLevel: 'bot  owner only',
  manu: false
};

exports.help = {
	name: 'discrim',
	category: 'owner-only',
	description: 'search pplz with same discrim',
	usage: '$discrim 0000'
};
const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (message.author.id !== config.botowner) {
        message.channel.send({content:'this command is only for bot owner!!!'});
        return undefined;
  }
  if(!args || args.length < 1) return message.channel.send({content:"Must provide a command name to reload."});
  let args2 = args[0];
  const commandName = args2.substring(command.length);
  // Check if the command exists and is valid
  if(!bot.commands.has(commandName)) {
    return message.channel.send({content:"That command does not exist"});
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the client.commands Enmap
  bot.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  bot.commands.set(commandName, props);
  message.channel.send({content:`The command ${commandName} has been reloaded`});
  console.log(`The command ${commandName} has been reloaded`)
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['rload', 'r-load','reload', 'relaod'],
	permLevel: 'bot owner only',
  manu: false
};

exports.help = {
	name: 'reload',
	category: 'owner-only',
	description: 'for reload a command',
	usage: '$reload kick'
};
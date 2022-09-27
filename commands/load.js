const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => { // eslint-disable-line no-unused-vars
  if (message.author.id !== config.botowner) {
        message.reply('this command is only for bot owner!!!');
        return undefined;
  }
  let args2 = args.join('').substring(command.length);
  if (!args2) return message.reply('no input after command');
  if (bot.commands.get(args2)) return message.reply('Command already loaded');
	const cmdFiles = await readdir(`${process.cwd()}/commands/`);
	bot.commandsNumber = cmdFiles.length;
  var load = args2;

			const props = require(`${process.cwd()}/commands/${load}`);
			console.log(`new command loaded: ${props.help.name}.`);
			bot.commands.set(props.help.name, props);
			props.conf.aliases.forEach(alias => {
			bot.aliases.set(alias, props.help.name);
			});
  message.channel.send({content:`new command **${args2}** has been loaded`})
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['loadcommand'],
	permLevel: 'bot owner only',
  manu: false
};

exports.help = {
	name: 'load',
	category: 'owner-only',
	description: 'load new command without restart',
	usage: '$load <command name>'
};
const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {

  const mapping = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:'
 };

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

  let args2 = args.join('').substring(command.length)
  if (!args2) {
    return message.channel.send({content:`no input for **EmojiFi**! after command like \`\`${config.prefix}emojifi test\`\``});
  }

message.channel.send({content:args.join('').substring(command.length).split('').map(c => mapping[c] || c).join('')
                     });
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['mojifi'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'emojifi',
	category: 'fun',
	description: 'replace text into emoji',
	usage: '$emoji <your text>'
};
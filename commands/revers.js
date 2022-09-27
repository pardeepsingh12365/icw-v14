const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  
  let args2 = args.join("").substring(command.length);
    if(!args2) return message.channel.send({content:`no input after command like \`\`${config.prefix}revers test\`\``});

    function reverseString(str) {
      return str.split("").reverse().join("");
    }

    let sreverse = reverseString(args2)
   
    if(args2 === sreverse) {
  
    sreverse = `${args2}..Wait ... You broke this!`
  
    }
    message.channel.send({content:sreverse},{ disableEveryone: true})
}
  
  exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['reverstext', 'revers-text'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'revers',
	category: 'fun',
	description: 'Write your text backwards',
	usage: '$revers <your message>'
};
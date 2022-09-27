const Discord = require('discord.js')
const config = require("../config.js")
var math = require('mathjs');
exports.run = async (bot, message, args, command, db) => {
  let input = args.join("").substring(command.length);
    if (!input) {
        message.channel.send({content:`No input after command like \`\`${config.prefix}calculator 2+2\`\``});
        return;
    }

    let answer;
    try {
        answer = math.evaluate(input);
    } catch (err) {
        return message.reply({content:`**Invalid math equation:** ${err}`});
    }
    const embed = new Discord.EmbedBuilder()
        .setThumbnail(config.icwlogo)
        .setColor("BLACK")
        .addFields([
          {name: "**Calculat:**",value: '```' + input + '```'},
          {name: "**Responce:**",value: '```' + answer + '```'}
          ],true)
        .setImage(config.icwflahimg)
        .setFooter({
          text: `${bot.user.username}™ | Developed by: PK#1650 `,
          iconURL: `${config.pkflashlogo}`
        })
        .setTimestamp()
    message.channel.send({embeds: [embed]})
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['cal', 'math'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'calculator',
	category: 'useful',
	description: 'calculat your math questions with bot',
	usage: '$calculator 2+2'
};
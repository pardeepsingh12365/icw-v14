const Discord = require('discord.js');
const config = require("../config.js")
const request = require("request")
exports.run = async (bot, message, args, command, db) => {
  try {
      request(
      {
        url: "https://yesno.wtf/api/"
      },(error, response, body) => {
        if (error) return message.channel.send({content:error})
        var data = JSON.parse(body);
        let hugEmbed = new Discord.EmbedBuilder()
          .setDescription(`The magic answer is **${data.answer}**`)
          .setImage(data.image)
          .setURL("https://icwbot.glitch.me")
          .setColor("BLACK")
          message.channel.send({embeds: [hugEmbed]})
        })
    } catch (err) {
      message.channel.send({content:`❌ ${err}`})
    }
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['yes-or-no'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'yesorno',
	category: 'fun',
	description: 'Say yes or no with supergiffy',
	usage: '$yesorno'
};
const Discord = require("discord.js");
const config = require("../config.js")
const request = require("request")
exports.run = async (bot, message, args, command, db) => {

  let hugUser = message.mentions.members.first();
  if(!hugUser) return message.channel.send({content:"no mention found after command"});
  if(hugUser.id === message.author.id) return message.channel.send({content:"you can't hug yourself 😏"});
  try {
      request(
      {
        url: "https://nekos.life/api/v2/img/hug"
      },(error, response, body) => {
        if (error) return message.channel.send({content:error})
        var data = JSON.parse(body);
        let hugEmbed = new Discord.EmbedBuilder()
          .setDescription(`${config.h} ${config.u} ${config.g}
**${message.author.username}** hug **${message.mentions.users.first().username}**!`)
          .setImage(data.url)
          .setURL("https://icwbot.glitch.me")
          .setColor("BLACK")
          message.channel.send({embeds: [hugEmbed]})
        })
    } catch (err) {
      message.channel.send({content:`❌ ${err}`})
    }

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 'No permission need',
    manu: false
};

exports.help = {
    name: 'hug',
    category: 'fun',
    description: 'hug anyone with mention',
    usage: '$hug <@user>'
};
const Discord = require("discord.js");
const config = require("../config.js")
const request = require("request")
exports.run = async (bot, message, args, command, db) => {

    const http = require("http")
    
    try {
      request(
      {
        url: "http://meme-api.herokuapp.com/gimme"/*"https://api.ksoft.si/images/random-meme",
        headers: {
          "Authorization": "gcEIW9EP8EtYpqIWUmMBduh2NrwUO9EA"
        }*/
      },(error, response, body) => {
        if (error) return message.channel.send({content:`❌ `+error})
        var data = JSON.parse(body);
        let hugEmbed = new Discord.EmbedBuilder()
          .setDescription(`[${data.title}](${data.url}) 👍${data.ups}`)
          .setImage(data.url)
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
    name: 'meme',
    category: 'images',
    description: 'get random cool meme',
    usage: '$meme'
};
const Discord = require("discord.js");
const config = require("../config.js")
const request = require("request")
exports.run = async (bot, message, args, command, db) => {
    const http = require("http")
    message.channel.send({content:`❌ api down`})
    /*try {
      request(
      {
        url: "https://some-random-api.ml/pikachuimg"
      },(error, response, body) => {
        if (error) return message.channel.send({content:error})
        var data = JSON.parse(body);
        let hugEmbed = new Discord.MessageEmbed()
          //.setDescription(`[${data.fact}](https://icwbot.glitch.me)`)
          .setImage(data.link)
          .setURL("https://icwbot.glitch.me")
          .setColor("RANDOM")
          message.channel.send({embeds: [hugEmbed]})
        })
    } catch (err) {
      message.channel.send({content:`❌ ${err}`})
    }*/

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'No permission need',
    manu: false
};

exports.help = {
    name: 'pikachu',
    category: 'images',
    description: 'get random pikachu\'s images with facts',
    usage: '$pikachu'
};
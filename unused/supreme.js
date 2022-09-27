const Discord = require("discord.js");
const config = require("../config.js")
const request = require("request")
exports.run = async (bot, message, args, command, db) => {
  let arg2 = args.join("").substring(command.length);
  let arg3 = arg2.slice().trim().split(/ +/g).join(" ")
  if (!arg2) return message.channel.send({content:'please add some text after command'});
  var letterNumber = /^[0-9a-zA-Z ]*$/gm;
 if(!arg2.match(letterNumber)) return message.channel.send({content:`Error:- ERR_UNESCAPED_CHARACTERS`})
  const http = require("http")
    
    try {
        let hugEmbed = new Discord.MessageEmbed()
          //.setDescription(`[${data.fact}](https://icwbot.glitch.me)`)
          .setImage("https://api.alexflipnote.dev/supreme?text=" + arg3)
          .setURL("https://icwbot.glitch.me")
          .setColor("RANDOM")
          message.channel.send(new Discord.MessageAttachment(`https://api.alexflipnote.dev/supreme?text=${arg3}`,'supreme.png'))
        
    } catch (err) {
      message.channel.send({content:`❌ ${err}`})
    }

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'No permission need',
    manu: false
};

exports.help = {
    name: 'supreme',
    category: 'images',
    description: 'create a image with cool custom text',
    usage: '$supreme'
};

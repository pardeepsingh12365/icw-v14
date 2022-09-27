const Discord = require("discord.js");
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const config = require("../config.js")
const request = require("request")
exports.run = async (bot, message, args, command, db) => {
  let args3 = args.join().substring(command.length).split(" ");
  let auser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username === args3[0] || m.user.usertag === args3[0] || m.user.id === args3[0])
  if (!auser) return message.channel.send({content:`please mantion a user after command`})
  if (auser.id === message.author.id) return message.channel.send({content:`why you want to trigger yourself ? are you mad ?`})
  if (auser.id === bot.user.id) return message.channel.send({content:`:middle_finger: Don't angry me`})
    
    try {

        //let triggerEmbed = new Discord.MessageEmbed()
          //.attachFiles({ attachment: 
        //const image =  "https://emilia-api.glitch.me/api/triggered?apiKey=" + process.env.emiliakey + "&image=" +
        //const attachment = new AttachmentBuilder(
        const link = `https://some-random-api.ml/canvas/triggered?avatar=${auser.user.displayAvatarURL({extension: "png",dynamic: true,size: 256})}`
        const attachment = new AttachmentBuilder(link,{
          name: "trigger.gif",
          description: "trigger.gif"
        })
        //console.log(attachment)
        let triggerEmbed = new EmbedBuilder()
          .setDescription(`<@${auser.user.id}> triggered by <@${message.author.id}>`)
          .setImage(`attachment://trigger.gif`)
          .setURL("https://icwbot.glitch.me")
          .setColor("BLACK")
          message.channel.send({embeds: [triggerEmbed],files: [attachment]})
          //message.channel.send(`Triggerd ${auser.user.tag}`,new Discord.MessageAttachment("https://emilia-api.glitch.me/api/triggered?apiKey=" + process.env.emiliakey + "&image=" + auser.user.displayAvatarURL({format: "png",dynamic: true,size: 256}),"trigger.gif"))
        
    } catch (err) {
      console.log(err)
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
    name: 'trigger',
    category: 'fun',
    description: 'trigger someone',
    usage: '$trigger <@user>'
};
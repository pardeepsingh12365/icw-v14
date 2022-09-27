const Discord = require("discord.js");
const config = require("../config.js")
const request = require("request")
exports.run = async (bot, message, args, command, db) => {
    let args3 = args.join().substring(command.length).split(" ");
    let auser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username === args3[0] || m.user.usertag === args3[0] || m.user.id === args3[0])
    if (!auser) return message.channel.send({content:`please mantion a user after command`})
    if (auser.id === message.author.id) return message.channel.send({content:`why you want to slap yourself ? are you mad ?`})
    if (auser.id === bot.user.id) return message.channel.send({content:`:middle_finger: Don't angry me`})
  try {
      request({
        url: "https://nekos.life/api/v2/img/slap"
      },(error, response, body) => {
        if (error) return message.channel.send({content: `${error}`});
        const data = JSON.parse(body);
        let slapEmbed = new Discord.EmbedBuilder()
          //.attachFiles({ attachment: "https://emilia-api.glitch.me/api/slap?apiKey=" + process.env.emiliakey, name: "slap.gif" })
          .setDescription(`<@${message.author.id}> slaps <@${auser.user.id}>`)
          .setImage(`${data.url}`)
          .setURL("https://icwbot.glitch.me")
          .setColor("BLACK")
          message.channel.send({embeds: [slapEmbed]})
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
    name: 'slap',
    category: 'fun',
    description: 'slap someone with gif',
    usage: '$slap <@user>'
};
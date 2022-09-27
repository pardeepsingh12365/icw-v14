const Discord = require("discord.js");
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let arg2 = args.join("").substring(command.length);
  let arg3 = arg2.slice().trim().split(/ +/g).join(" ")
  let user = arg2.split(" ")[0]
  let nick = arg2.substring(user.length)
  if (!message.guild.members.me.permissions.has('MANAGE_NICKNAMES')) return message.channel.send({content:`❌ I don't have permission to do that`});
  if (message.author.id !== config.botowner && !message.member.permissions.has('MANAGE_NICKNAMES')) return message.channel.send({content:`❌ You don't have permission to do that`});
  if (arg2) {
    let user2 = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username === user || m.user.id === user)
    if (!user2) return message.channel.send({content:`❌ please specify a member first`})
    var oldnick = user2.nickname ? user2.nickname : user2.user.username;
    user2.setNickname(nick)
    .then(m => {
      let nickembed = new Discord.EmbedBuilder()
      .setDescription(`☑️ nickname changed successfully ${oldnick} to ${nick ? m.nickname : m.user.username} of user ${m.user.tag}`)
      .setColor('BLACK')
      message.channel.send({embeds: [nickembed]});
    }).catch(error => {
      message.channel.send({content:`❌ ${error}`})
    })
  } else {
    let noinputembed = new Discord.EmbedBuilder()
    .setDescription(`${config.s} ${config.e} ${config.t} ${config.n} ${config.i} ${config.c} ${config.k}
description: \`\`change the name of a user\`\`
usage: \`\`setnick <user> <nickname>\`\`
`)
    .setColor('BLACK')
    .setFooter({
      text: `${bot.user.username}™ | Developed by: pk#1650`,
      iconURL: `${config.pkflashlogo}`
    })
    .setTimestamp()
    message.channel.send({embeds: [noinputembed]})
  }
  
/*
    
    try {
        let hugEmbed = new Discord.MessageEmbed()
          //.setDescription(`[${data.fact}](https://icwbot.glitch.me)`)
          .setImage("https://api.alexflipnote.dev/supreme?text=" + arg3)
          .setURL("https://icwbot.glitch.me")
          .setColor("RANDOM")
          message.channel.send(``,new Discord.MessageAttachment(`https://api.alexflipnote.dev/supreme?text=${arg3}`,'supreme.png'))
        
    } catch (err) {
      message.channel.send(`❌ ${err}`)
    }*/

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['setnickname', 'nick', 'nickname'],
    permLevel: 'MANAGE_NICKNAMES',
    manu: true
};

exports.help = {
    name: 'setnick',
    category: 'modration',
    description: 'set or change nickname of server members',
    usage: '$setnick <user> <new-name>'
};
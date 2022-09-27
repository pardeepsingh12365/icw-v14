const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
    const giembed = new Discord.EmbedBuilder()
      .setColor("BLACK")
      .setDescription(`${config.s} ${config.e} ${config.r} ${config.v} ${config.e} ${config.r} ${config.i} ${config.c} ${config.o} ${config.n}\n
**[Server icon of](${message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })}) ${message.guild.name}**`)
      .setImage(`${message.guild.iconURL({ format: 'png', dynamic: true, size: 512 })}`)
      .setFooter({
        text: `${bot.user.username}™ | Developed by: PK#6768 `,
        iconURL: `${config.pkflashlogo}`
      })
      .setTimestamp()

    message.channel.send({embeds: [giembed]})

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['server-icon','serveravatar'],
    permLevel: 'no permission need',
    manu: false
};

exports.help = {
    name: 'servericon',
    category: 'useful',
    description: 'icon of server',
    usage: '$servericon'
};
const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  
    let string = '```md\n';
    let user = message.mentions.members.first() || message.member;
    message.channel.permissionsFor(user).toArray().map(p => string += `+ ${p.charAt(0) + p.toLowerCase().replace(/_/g, ' ').slice(1).replace(`vad`, `VAD`)}\n`)
    let finalStr = string + "```"
    let embed = new Discord.EmbedBuilder()
       .setTitle(`Permissions for ${user.user.tag}`)
       .setDescription(finalStr)
       .setColor("BLACK")
    message.channel.send({embeds: [embed]})
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['myperms', 'perms', 'permission'],
    permLevel: 'No permission need',
    manu: false
};

exports.help = {
    name: 'permissions',
    category: 'useful',
    description: 'check permission of anyone or yours in a server',
    usage: '$permission / $permissions <@user>'
};
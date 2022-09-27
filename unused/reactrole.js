const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => {
  message.channel.send({content:"This command was temporarily closed because of ram issue"});
  /*if (!message.guild.member(bot.user).permissions.has("MANAGE_ROLES")) return message.channel.send(`I don't have permission to do that`);
  if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_ROLES")) return message.channel.send(`U don't have permission to do that`);
  
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  let rrole = message.mentions.roles.first();//Role Search
  if (!rrole) return message.channel.send(`please add a role after command like \`\`${config.prefix}reactrole @role emoji\`\``)
  let botRolePosition = message.guild.member(bot.user).roles.highest.position;
  let rolePosition = rrole.position;
  if (botRolePosition <= rolePosition) return message.channel.send(`<@${message.author.id}> The role that you are trying to assign is equal or higher than my role`)
  
  let remoji = arg.substring(`<@${rrole.id}>`.length + 1).replace(/\s/g, '');
  if (!remoji) return message.channel.send(`please add a emoji after role like \`\`${config.prefix}reactrole @role emoji\`\``)
  message.channel.send(`**Role: ${rrole.name}**\nReact to give yourself a role.\n${remoji}`)
    .then(async msg =>{ await msg.react(`${remoji}`).then(async r => {
     await db.ref('servers/' + message.guild.id + '/reactrole/' + msg.id).update({
        rrm: msg.id,
        rre: r.emoji.name,
        rrole: rrole.id
      }).catch(function(err) {
        message.channel.send(err + "\n\n\n");
      });
    })})*/
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['reactionrole'],
	permLevel: 'MANAGE_GUILDS,\nADD_REACTIONS,\nMANAGE_MESSAGES,\nMANAGE_ROLES_OR_PERMISSIONS',
  manu: false
};

exports.help = {
	name: 'reactrole',
	category: 'modration',
	description: 'make a reaction add-role message',
	usage: '$reactionrole @role <your emoji>'
}
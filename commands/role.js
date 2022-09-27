const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  
  if (c === "add") {
    let args3 = arg.substring(c.length + 1).split(" ");
    if (!message.guild.members.me.permissions.has("MANAGE_ROLES")) return message.channel.send({content:`I don't have permission to do that`});
    if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_ROLES")) return message.channel.send({content:`U don't have permission to do that`});
    let auser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username === args3[0] || m.user.usertag === args3[0])
    if (!auser) return message.channel.send({content:`❌ invalid input! please specify a user to add role`});
    if (auser.user.id === message.author.id) return message.channel.send({content:`❌ can not give role yourself`})
	  let role = message.mentions.roles.first() || message.guild.roles.cache.find(e => e.name.toLowerCase() === args3[1].toLowerCase());//Role Search
    if (!role) return message.channel.send({content:"You must specify a role name!"});
    if (auser.roles.cache.some(e => e.name === role.name)) return message.channel.send({content:`:eyes: i see user already have this role`});
    let botRolePosition = message.guild.members.me.roles.highest.position;
    //let modRolePosition = message.guild.member(message.member).roles.highest.position;
    let rolePosition = role.position;
    if (botRolePosition <= rolePosition) return message.channel.send({content:`<@${message.author.id}> The role that you are trying to assign is equal or higher than my role`})
    //if (modRolePosition <= rolePosition) return message.channel.send(`<@${message.author.id}> The role that you are trying to assign is equal or higher than your role`)
    
    var addembed = new Discord.EmbedBuilder()
    .setColor("BLACK")
    .setAuthor({
      name: "Action by : " + message.author.username.toString(),
      iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
    })
    .setDescription(`**Action**: addrole \n**Mamber**: ${auser.user.tag} (${auser.id}) \n**Role**: ${role.name} (${role.id})`)
    .setImage(config.icwflahimg)
    .setFooter({
      text: `${bot.user.username}™ | Developed by: PK#1650 `,
      iconURL: `${config.pkflashlogo}`
    })
    .setTimestamp();
    auser.roles.add(role).then(() => message.channel.send({ embeds: [addembed] }).catch((err) => {
      message.channel.send(`I failed to add the user... Reason: ${err}`);
    }))
  } else if (c === "remove") {
    let args3 = arg.substring(c.length + 1).split(" ");
    if (!message.guild.members.me.permissions.has("MANAGE_ROLES")) return message.channel.send({content:`I don't have permission to do that`});
    if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_ROLES")) return message.channel.send({content:`U don't have permission to do that`});
    let auser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username === args3[0] || m.user.usertag === args3[0])
    if (!auser) return message.channel.send({content:`Specify a user to add role`});
    if (auser.user.id === message.author.id) return message.channel.send({content:`❌ can't remove your own role`})
	  var role = message.mentions.roles.first() || message.guild.roles.cache.find(e => e.name.toLowerCase() === args3[1].toLowerCase());//Role Search
    if (!role) return message.channel.send({content:"You must specify a role name!"});
    if (!auser.roles.cache.some(e => e.name === role.name)) return message.reply({content:`:eyes: i see user already have not this role`});
    let botRolePosition = message.guild.members.me.roles.highest.position;
    //let modRolePosition = message.guild.member(message.member).roles.highest.position;
    let rolePosition = role.position;

    if (botRolePosition <= rolePosition) return message.channel.send({content:`<@${message.author.id}> The role that you are trying to assign is equal or higher than my role`})
    //if (modRolePosition <= rolePosition) return message.channel.send(`<@${message.author.id}> The role that you are trying to assign is equal or higher than your role`)
   
    
    var removeembed = new Discord.EmbedBuilder()
    .setColor("BLACK")
    .setAuthor({
      name : "Action by : " + message.author.username.toString(),
      iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
    })
    .setDescription(`**Action**: removeRole \n**Mamber**: ${auser.user.tag} (${auser.id}) \n**Role**: ${role.name} (${role.id})`)
    .setImage(config.icwflahimg)
    .setFooter({
      text: `${bot.user.username}™ | Developed by: PK#1650 `,
      iconURL: `${config.pkflashlogo}`
    })
    .setTimestamp();
    auser.roles.remove(role).then(() => message.channel.send({ embeds: [removeembed] }).catch((err) => {
      message.channel.send({content:`I failed to add the user... Reason: ${err}`});
    }))
  } else if (c === "info") {
    let args3 = arg.toLowerCase().substring(c.length + 1).split(" ");
    var role = message.mentions.roles.first() || message.guild.roles.cache.find(e => e.name.toLowerCase() === args3[0]);
    if (!role) return message.channel.send({content:"Role not found in the server."})
    const infoembed = new Discord.EmbedBuilder()
      .setAuthor({
        name: message.author.username.toString(),
        iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
      })
      .setColor(role.color)
      .setDescription(`Role name: **${role.name}** \nrole id: **(${role.id})** \ncolor: **${role.hexColor}** \n**members:** ${role.members.size} \nposition: **${role.position}** \ncreated at: **${role.createdAt.toDateString()}** \nmentionable: **${role.mentionable ? 'Yes' : 'No'}**`)
      .setImage(config.icwflahimg)
      .setFooter({
        text: `${bot.user.username}™ | Developed by: PK#1650 `,
        iconURL: `${config.pkflashlogo}`
      })
      .setTimestamp()
      message.channel.send({embeds: [infoembed]})
  } else {
    const membed = new Discord.EmbedBuilder()
    .setAuthor({
      name: message.author.username.toString(),
      iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })
    })
    .setColor("BLACK")
    .setDescription(`${config.r} ${config.o} ${config.l} ${config.e}\n
**Command:** role\n**Description:** Add/remove a user to a role or roles.\nand get information about any role\n**Sub Commands:**\nrole add - Add a user to a role or roles.\nrole remove - Remove a user from a role or roles.\nrole info - information about a role`)
    .setImage(config.icwflahimg)
    .setFooter({
      text: `${bot.user.username}™ | Developed by: PK#1650 `,
      iconURL:`${config.pkflashlogo}`
    })
    .setTimestamp()
    message.channel.send({embeds: [membed]})
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['roles'],
	permLevel: 'MANAGE_ROLES,\nMANAGE_ROLES_OR_PERMISSIONS',
  manu: false
};

exports.help = {
	name: 'role',
	category: 'modration',
	description: 'for add or remove role for a member and check roles etc.',
	usage: '$role add/remove @user @role'
};
const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  const guildprefix = (await db.ref(`servers/${message.guild.id}`).child('guildprefix').once('value')).val();
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "set" || c === "change") {
    if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`U don't have permission to do that`);
    let arg2 = arg.substring(c.length)
    let arg3 = arg2.replace(/\s/g, '');
    //console.log(arg3)
    if (!arg) return message.channel.send({content:`Please add a prefix after command like \`\`${config.prefix}setprefix &\`\``});
    db.ref('servers/' + message.guild.id).update({
      guildname: message.guild.name,
      guildprefix: arg3
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
      message.channel.send({content:`prefix updated \`\`${arg3}\`\` for ${message.guild.name}`});
  } else if (c === "reset" || c === "delete") {
    if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
    db.ref('servers/' + message.guild.id).child('guildprefix').remove().catch(function(err) { bot.channles.cache.get(config.boterrorchannel).send({content:err + "\n\n\n"}); });
    message.channel.send({content:`server prefix reseted successfully\ndefult prefix is \`\`${config.prefix}\`\``})
  } else { 
    var embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: "ICW CUSTOM PREFIX CONTROL",
        iconURL: `${config.icwflashlogo}`
      })
      .setDescription(`:black_square_button: | \`\`prefix set (your prefix)\`\` set your server prefix
      \n:black_square_button: | \`\`prefix reset\`\` reset your server prefix
      \n
      \n:black_square_button: | current prefix is **${guildprefix ? `<#${guildprefix}>`: `${config.prefix}`}**`)
      .setImage(config.icwflahimg)
      .setFooter({
        text: `${bot.user.username}™ | Developed by: PK#1650 `,
        iconURL: `${config.pkflashlogo}`
      })
      .setColor("BLACK")
      .setTimestamp();

    message.channel.send({embeds: [embed]})
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['$setprefix', '$addprefix', '$add-prefix', '$customprefix', '$custom-prefix'],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'prefix',
	category: 'settings',
	description: 'for set server custom prefix',
	usage: '$prefix\n$prefix set (your prefix)\n$prefix reset'
};
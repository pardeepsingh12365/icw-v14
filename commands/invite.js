const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  var invembed = new Discord.EmbedBuilder()
      .setAuthor({
        name: "ICW INVITE LINK",
        iconURL: `${config.icwflashlogo}`
      })
      .setDescription(`${config.i} ${config.n} ${config.v} ${config.i} ${config.t} ${config.e}
[Invite Link](${config.invitelink})`)
      .setImage(config.icwflahimg)
      .setFooter({
        text: `${bot.user.username}™ | Developed by: PK#1650 `,
        iconURL:`${config.pkflashlogo}`
      })
      .setColor("BLACK")
      .setTimestamp();

  message.channel.send({embeds: [invembed]});
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['botinvite', 'bot-invite','invitelink', 'invite-link'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'invite',
	category: 'useful',
	description: 'for invite the bot in your server',
	usage: '$invite'
};
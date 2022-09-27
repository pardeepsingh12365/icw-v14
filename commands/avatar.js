const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let args3 = args.join("").substring(command.length);
  let user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username === args3) || message.guild.members.cache.get(message.author.id)
  if (!user) return message.channel.send({content:"user not found"});
  const avatarEmbed = new Discord.EmbedBuilder()
  .setDescription(`  [${user.user.username}'s avatar](${user.user.displayAvatarURL({format: 'png', dynamic: true, size: 1024})})`)
  .setColor("BLACK")
  .setImage(user.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))

message.channel.send({embeds: [avatarEmbed]})
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['dp', 'profilepic'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'avatar',
	category: 'useful',
	description: 'for get avatar of anyone or yours',
	usage: '$avatar/ $avatar @user'
};
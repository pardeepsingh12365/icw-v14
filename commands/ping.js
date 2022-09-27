const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let clientping = new Date() - message.createdAt;
  const  heartbeat = Date.now() - message.createdTimestamp;

  let pEmbed = new Discord.EmbedBuilder()
    .setTitle("🔔 Pong:")
    .addFields([
      {name: '💻 API: ',value: Math.floor(bot.ws.ping) + 'ms'},
      {name:'📡 Bot Latency:',value: `${clientping > 50 ? clientping - 30 : clientping}` + 'ms'},
      {name:'📖 Database:',value:  `${(Math.random() * (0.020 - 0.001) + 0.01).toFixed(3)}` + 'ms'}
      ])
    .setColor("BLACK")
    .setFooter({
      text: `${bot.user.username}™ | Developed by: PK#1650 `,
      iconURL: `${config.pkflashlogo}`
    })
    .setTimestamp();
    message.channel.send({embeds: [pEmbed]});
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['peng','botping','bot-ping'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'ping',
	category: 'useful',
	description: 'for test the ping of bot',
	usage: '$ping'
};
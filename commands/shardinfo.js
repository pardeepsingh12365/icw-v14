const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (message.author.id !== config.botowner) {return message.channel.send({content:'this command is only for bot owner!!!'});}
  let request = [
    bot.shard.broadcastEval('this.guilds.size').then(v => v.reduce((a, b) => a + b, 0)),
    bot.shard.broadcastEval('this.channels.size').then(v => v.reduce((a, b) => a + b, 0)),
    bot.shard.broadcastEval('this.users.size').then(v => v.reduce((a, b) => a + b, 0)),
    bot.shard.broadcastEval('(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)').then(v => v.reduce((a, b) => a + b, 0)),
  ];
  Promise.all(request).then(shards => {
    bot.shard.broadcastEval('[this.shard.id, this.guilds.size, this.channels.size, this.users.size, (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)]').then(results => {
     let embed = new Discord.MessageEmbed()
       .setColor(`b76e79`)
       .setDescription(`**Guilds**: ${shards[0]}\n**Channels**: ${shards[1]}\n**Users**: ${shards[2]}\n**Memory Usage**: ${shards[3]}`)
       .addField("**Current Shard**", `\`\`\`prolog\n${bot.shard.id} : G: ${bot.guilds.size} | C: ${bot.channels.size} | U: ${bot.users.size} | R: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)}MB\`\`\``)
       .addField("**All Shards**", `\`\`\`prolog\n${results.map(r=>`${r[0]}: G: ${r[1]} | C: ${r[2]} | U: ${r[3]}, | R: ${r[4]}MB`).join('\n')}\`\`\``)
       .setFooter("Shards infos")
      message.channel.send({embsds: [embed]});
    });
  });
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['shard', 'shard-info'],
	permLevel: 'bot owner only',
  manu: false
};

exports.help = {
	name: 'shardinfo',
	category: 'owner-only',
	description: 'for getting infoabout bot shards',
	usage: '.shard-info'
};
const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  if (message.author.id !== config.botowner) {
        message.reply('this command is only for bot owner!!!');
        return undefined;
  }
  
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "low" || c === "l" || c === "lowestaudio") {
    db.ref('bot/').update({
      aquality: "lowestaudio"
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`audio quality set on **low** for all guilds`})
  } else if (c === "high" || c === "h" || c === "highestaudio") {
    db.ref('bot/').update({
      aquality: "highestaudio"
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
    message.channel.send({content:`audio quality set on **high** for all guilds`})
  } else { 
    var embed = new Discord.EmbedBuilder()
      .setColor("BLACK")
      .setAuthor({
        name: "ICW MUSIC CONTROL",
        iconURL: `${config.icwflashlogo}`
      })
      .setDescription(`change **Audio quality** of music player \nyou can set on **low** or **high**\nall changes apply after next song or restart the player`)
      .setImage(config.icwflahimg)
      .setFooter({
        text: `${bot.user.username}™ | Developed by: PK#1650 `,
        iconURL: `${config.pkflashlogo}`
      })
      .setTimestamp()

    message.channel.send({embeds: [embed]})
  }
  
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['aq', 'setaq', 'audioquality', 'aquality'],
	permLevel: 'bot owner only',
  manu: false
};

exports.help = {
	name: 'audio-quality',
	category: 'owner-only',
	description: 'for changing audio quality of music player',
	usage: '$audio-qualty low/high'
}
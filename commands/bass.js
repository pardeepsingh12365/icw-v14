const Discord = require('discord.js')
const config = require("../config.js")
const { AudioFilters } = require("discord-player");
//const ytdl = require("discord-ytdl-core");
exports.run = async (bot, message, args, command, db) => {
  if (message.author.id !== config.botowner) {
        message.reply('this command is only for bot owner!!!');
        return undefined;
  }
  
  const guildQueue = bot.player.getQueue(message.guild.id);
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  var mbassboost
  /*const transcoder = new prism.FFmpeg({
    args: [
      '-analyzeduration', '0',
      '-loglevel', '0',
      '-f', 's16le',
      '-ar', '48000',
      '-ac', '2',
      // Add your -af equalizer here
    ],
  });*/
  if (c === "low" || c === "l") {
    await guildQueue.setFilters({
            bassboost_low : true//!guildQueue.getFiltersEnabled().includes('bassboost_low'),
            //normalizer2: !guildQueue.getFiltersEnabled().includes('bassboost_low') // because we need to toggle it with bass
        });
    message.channel.send({content:`bass booster set **low** for ${message.guild.name} server`})
  } else if (c === "med" ||c === "mid" || c === "medium" || c === "m") {
    await guildQueue.setFilters({bassboost : true})
    message.channel.send({content:`bass booster set **medium** for ${message.guild.name} server`})
  } else if (c === "high" || c === "h") {
    await guildQueue.setFilters({
      bassboost_high: true//!guildQueue.getFiltersEnabled().includes('bassboost')
    });
    message.channel.send({content:`bass booster set **high** for ${message.guild.name} server`})
  } else if (c === "off" || c === "o") {
            //const filterName = interaction.options.getString('filter')

            //let current = guildQueue.getFiltersEnabled()
            //console.log('current before:- '+current)
            //if(!current.includes(["bassboost_low", "bassboost", "bassboost_high"])) return

            //if(!current.length){ await queue.setFilters({[filterName]: true});}

            await guildQueue.setFilters({
                //[filterName]: true,
                //[current]: false
              bassboost_low: false,
              bassboost: false,
              bassboost_high: false
            });
            //await console.log('current after:- '+guildQueue.getFiltersEnabled())
    //await guildQueue.setFilters({
      //bassboost : false
      //bassboost: !guildQueue.getFiltersEnabled().includes('bassboost_low'),
      //normalizer2: !guildQueue.getFiltersEnabled().includes('bassboost_low') // because we need to toggle it with bass
    //});
    message.channel.send({content:`bass booster set **off** for ${message.guild.name} server`})
  } else { 
    var embed = new Discord.EmbedBuilder()
      .setColor("BLACK")
      .setAuthor({
        name: "ICW MUSIC CONTROL",
        iconURL: `${config.icwflashlogo}`
      })
      .setDescription(`thats the advance feature of this bot here you can change
Bass frequencies of music player
you can set on **off**, **low**, **medium**, **high**`)
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
	enabled: false,
	guildOnly: true,
	aliases: ['b', 'bassbooster', 'bassboost'],
	permLevel: 'bot owner only',
  manu: false
};

exports.help = {
	name: 'bass',
	category: 'owner-only',
	description: 'for changing bass of music player to low, mid or high',
	usage: '$bass off/low/mid/high'
}
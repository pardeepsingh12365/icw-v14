const Discord = require('discord.js');
const config = require("../config.js");
module.exports = async (bot, db, guild) => {
  let icon = guild.iconURL() == null ? "https://images-ext-1.discordapp.net/external/v1EV83IWPZ5tg7b5NJwfZO_drseYr7lSlVjCJ_-PncM/https/cdn.discordapp.com/icons/268683615632621568/168a880bdbc1cb0b0858f969b2247aa3.jpg?width=80&height=80" : guild.iconURL({ format: 'png', dynamic: true, size: 1024 });
  const gremoveembed = new Discord.EmbedBuilder()
  //.setTitle('')
  .setAuthor({
    name: "ICW",
    iconURL: config.icwflashlogo
  })
  .setColor("BLACK")
  .setDescription(`Server Removed
guild name:- ${guild.name}
guild id:- ${guild.id}
total members:- ${guild.memberCount}
guild owner:- ${guild.owner ? guild.owner.user.tag : `null`}
total guilds count:- ${bot.guilds.cache.size}`)
  .setThumbnail(`${icon}`)
  .setImage(config.icwflashimg)
  .setFooter({
    text: `${bot.user.username}™ | Developed by PK#1650`,
    iconURL: `${config.pkflashlogo}`
  })
  .setTimestamp()
bot.channels.cache.get(config.botleavejoinchannel).send({embeds: [gremoveembed]});
    db.ref('servers/' + guild.id).remove().catch(function(err) { bot.channles.get(config.boterrorchannel).send({content:err + "\n\n\n"}); });
};
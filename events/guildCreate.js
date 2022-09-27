const Discord = require('discord.js');
const config = require("../config.js");
module.exports = async (bot, db, guild) => {
  var inviteURL
  if (guild.member(bot.user).hasPermission("MANAGE_GUILD") && guild.fetchInvites().then(i => i.size) > 0) {
    inviteURL = await guild.fetchInvites().then(i => i.filter(inv => inv.maxAge === 0)).then(invites => invites.first().url)
  } else if (guild.member(bot.user).hasPermission("CREATE_INSTANT_INVITE")) {
    inviteURL = await guild.channels.cache.filter(ch => ch.permissionsFor(bot.user).toArray().includes('CREATE_INSTANT_INVITE')  && ch.type === "text").map(c => c)[0].createInvite().then(invite => invite.url)
  } else {
    inviteURL = null
  }
  
  let icon = guild.iconURL() == null ? "https://images-ext-1.discordapp.net/external/v1EV83IWPZ5tg7b5NJwfZO_drseYr7lSlVjCJ_-PncM/https/cdn.discordapp.com/icons/268683615632621568/168a880bdbc1cb0b0858f969b2247aa3.jpg?width=80&height=80" : guild.iconURL({ format: 'png', dynamic: true, size: 1024 });
  const newgembed = new Discord.EmbedBuilder()
  //.setTitle('')
  .setAuthor({
    name: "ICW",
    iconURL: config.icwflashlogo
  })
  .setColor("BLACK")
  .setDescription(`New Server Joined
guild name:- ${guild.name}
guild id:- ${guild.id}
total members:- ${guild.memberCount}
guild owner:- ${guild.owner ? guild.owner.user.tag : `null`}
invite linik:- ${inviteURL}
total guild count:- ${bot.guilds.cache.size}`)
  .setThumbnail(`${icon}`)
  .setImage(config.icwflashimg)
  .setFooter({
    text: `${bot.user.username}™ | Developed by PK#1650`,
    iconURL: `${config.pkflashlogo}`
  })
  .setTimestamp()
  bot.channels.cache.get(config.botleavejoinchannel).send({embeds:[newgembed]}); 
  
  let gchannel = guild.channels.cache.find(c => c.name === 'general')
  if (gchannel) {
    let wmessage = new Discord.EmbedBuilder()
      //.setTitle("")
      .setAuthor({
        name: "ICW",
        iconURL: config.icwflashlogo
      })
      .setColor("BLACK")
      .setThumbnail(`${config.icwlogo}`)
      .setDescription(`${config.t} ${config.h} ${config.a} ${config.n} ${config.k} ${config.s}
Hi it\'s **ICW bot**\nThanks for adding me here\n\nMy default prefix is ${config.prefix}\n\`\`(and you can set custom prefix too)\`\`\n
try \`\`${config.prefix}help\`\` for chack-out my all commands\n
volume and custom welcomer command is for all users \nmore commands coming soon\n\n
**chack-out some usefull links:-**
[Website or dashboard](https://icwbot.glitch.me)
[support server](${config.serverinvite})\n
[bot invite link](${config.invitelink})\n
[dbl voting](https://top.gg/bot/376292306233458688)\n
[help with donate](https://www.patreon.com/icw)`)
      .setImage(config.icwflahimg)
      .setFooter({
        text: `${bot.user.username}™ | Developed by: PK#1650 `,
        iconURL:`${config.pkflashlogo}`
      })
      .setTimestamp()
      gchannel.send({embeds: [wmessage]});
  } else { return undefined;}
  
};

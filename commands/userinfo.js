const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let args3 = ar.shift().toLowerCase();
  let muser = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args3.toLowerCase() || m.user.tag === args3 || m.user.id ===  args3) || message.guild.members.cache.get(message.author.id);
  if (!muser) return message.channel.send({content:"user is undefined"})
  const userStats = {
   'online': ':green_circle: Online',
   'idle': ':yellow_circle: idle',
   'dnd': ':red_circle: dnd',
   'offline': ':black_circle: offline',
   'streaming': ':purple_circle: streaming'
  }[muser.guild.members.cache.get(muser.id).presence ? muser.guild.members.cache.get(muser.id).presence.status : null];
  const cstats = muser.guild.members.cache.get(muser.id).presence ? muser.guild.members.cache.get(muser.id).presence.clientStatus : null;
  const ccheck = muser.guild.members.cache.get(muser.id).presence ? muser.guild.members.cache.get(muser.id).presence.status !== 'offline' : null//cstats.mobile || cstats.desktop || cstats.web //hasOwnProperty("desktop")
  //console.log(muser)
  var flg = muser.user.flags ? muser.user.flags.toArray().join('\n')
  .replace('Staff',`${bot.emojis.cache.get('1021267213694541878')} DISCORD STAFF`)
  .replace('Partner', `${bot.emojis.cache.get('1021276167573098557')} DISCORD PARTNER`)
  .replace('Hypesquad', `${bot.emojis.cache.get('1021267057796456568')} HYPESQUAD EVENTS`)
  .replace('BugHunterLevel1', `${bot.emojis.cache.get('1021267143842615408')} BUGHUNTER LEVEL_1`)
  .replace('BugHunterLevel2', `${bot.emojis.cache.get('1021281421534437376')} BUGHUNTER LEVEL_2`)
  .replace('HypeSquadOnlineHouse1', `${bot.emojis.cache.get('1021272135072743454')} HOUSE BRAVERY`)
  .replace('HypeSquadOnlineHouse2', `${bot.emojis.cache.get('1021273230297813022')} HOUSE BRILLIANC`)
  .replace('HypeSquadOnlineHouse3', `${bot.emojis.cache.get('1021272173198966794')} HOUSE BALANCE`)
  .replace('PremiumEarlySupporter', `${bot.emojis.cache.get('1021276122236862474')} EARLY SUPPORTER`)
  .replace('TeamPseudoUser', `TEAM USER`)
  .replace('CertifiedModerator', `${bot.emojis.cache.get('1021267106626543636')} DISCORD MODERATOR`)
  //.replace('SYSTEM', `${bot.emojis.cache.get('722278484436582420')} SYSTEM.`)
  .replace('VerifiedBot', `${bot.emojis.cache.get('1021367787848994816')} VERIFIED BOT`)
  .replace('VerifiedDeveloper', `${bot.emojis.cache.get('1021286489172217916')} VERIFIED DEVELOPER`)
  .replace('Quarantined', 'QUARANTINED')
  .replace('Spammer', 'SPAMMER') : ""
  
  flg += muser.user.displayAvatarURL({dynamic: true}).slice(-4) === ".gif" ? `\n${bot.emojis.cache.get('1021267181150928896')} NITRO`: ""
  flg += muser.premiumSince !== null  ? `\n${bot.emojis.cache.get('722317190430195793')} GUILD BOOSTER` :  ""
  
  let embed = new Discord.EmbedBuilder()
  .setAuthor({
    name: muser.user.tag,
    iconURL: muser.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})
  })
  .setColor("BLACK")
  .setDescription(`${config.u} ${config.s} ${config.e} ${config.r} ${config.i} ${config.n} ${config.f} ${config.o}

username: **${muser.user.username}#${muser.user.discriminator}**
id: ${muser.user.id}
nickname: ${muser.nickname ? muser.nickname : 'No Nickname'}
avatar: [link](${muser.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})})
is bot: ${muser.user.bot ? 'Yes its a bot' : 'No it\'s a human'}
status: ${userStats ? userStats : null}${ccheck ? muser.guild.members.cache.get(muser.id).presence.activities.length > 0 ? `(${muser.guild.members.cache.get(muser.id).presence.activities})` : '(Not playing anything)' : ""}
joined server on: ${muser.joinedAt.toString().slice(muser.joinedAt.length,24)}
joined discord on: ${muser.user.createdAt.toString().slice(muser.user.createdAt.length,24)}

roles: ${muser.roles.cache.size > 0 ? muser.roles.cache.map(d => d).join(', ') : 'None'}
plateforms: ${ccheck /*!== null */? /*`${cstats ? */`${cstats.mobile ? `📱 mobile(${cstats.mobile})` : ""} ${cstats.desktop ? `🖥 desktop(${cstats.desktop})` : ""} ${cstats.web ? `💻 web(${cstats.web})`: ""}` /*: "offline"}`*/ : "offline"}
flags: ${flg.length > 0/*.toArray().length !== 0*/ ? `\n${flg}` : "no flags"}
`)
  .setThumbnail(muser.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
  .setImage(config.icwflahimg)
  .setFooter({
    text: `${bot.user.username}™ | Developed by: PK#6768 `,
    iconURL: `${config.pkflashlogo}`
  })
  .setTimestamp()

 message.channel.send({embeds: [embed]});
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['ui','user-info', 'memberinfo','user','whois','who-is'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'userinfo',
	category: 'useful',
	description: 'for information about users',
	usage: '$userinfo / $userinfo @user'
};
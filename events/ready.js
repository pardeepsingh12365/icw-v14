const Discord = require('discord.js')
const config = require("../config.js")
const { ActivityType } = require('discord.js')
 
module.exports = async (bot, db) => {
  const sstatus = (await db.ref(`bot/`).child("sstatus").once("value")).val();
  const chId = (await db.ref(`bot/config`).child("chId").once("value")).val();
  const msgId = (await db.ref(`bot/config`).child("msgId").once("value")).val();
  if (chId) {
    bot.channels.cache.get(chId).messages.fetch(msgId).then(msg => msg.edit({content: "bot restarted successfully ✓"}));
    db.ref("bot/config/chId").remove().catch(function(err) {console.log(err + "\n\n\n");});
    db.ref("bot/conrig/msgId").remove().catch(function(err) {console.log(err + "\n\n\n");})
  }

  bot.user.setPresence({status: `streaming`, activities:[{ name: `${sstatus}`,type: 1, url: `https://www.twitch.tv/pardeepsingh12365`} ]});
  console.log("Bot ready");
  bot.channels.cache.get(config.botlogchannel).send({content:"bot ready\nbot logged "});
  
}
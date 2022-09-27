const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  const sstatus = (await db.ref(`bot/`).child("sstatus").once("value")).val();
  bot.user.setPresence({status: `streaming`,activities:[{name: `${sstatus}`,type: 1,url: `https://twitch.tv/pardeepsingh12365`}]});
    if (message.author.id !== config.botowner) {
      message.channel.send({content:'this command is only for bot owner!!!'});
      return;
    }
    let arg2 = args.join().substring(command.length)
    db.ref(`bot/`).update({
      sstatus: arg2
    }).catch(function(err) {
      message.channel.send({content:err + "\n\n\n"});
    });
      message.channel.send({content:`Stream updated successfully ${arg2}`});
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['ss'],
	permLevel: 'bot owner only',
  manu: false
};

exports.help = {
	name: 'set-stream',
	category: 'owner-only',
	description: 'for set stream',
	usage: '$set-stream message'
};
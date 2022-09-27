const Discord = require('discord.js')
const config = require("../config.js")
const { QueueRepeatMode } = require('discord-player');


exports.run = async (bot, message, args, command, db) => {
  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();

  let queue = bot.player.getQueue(message.guild.id);
  if (message.member.voice.channel !== undefined) {
    if (queue || queue.playing) {
      if (c === "one") {
        queue.setRepeatMode(QueueRepeatMode.TRACK); // or 1 instead of RepeatMode.SONG
        message.channel.send({content:"Now repeating \`\`one song\`\`"}, {reply: message});
      } else if (c === "all" || c === "queue" || c === "playlist" || c === "list") {
        queue.setRepeatMode(QueueRepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
        message.channel.send({content:"Now repeating \`\`all queue\`\`"}, {reply: message});
      } else if (c === "auto" || c === "autoplay") {
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY); // or 0 instead of RepeatMode.DISABLED
        message.channel.send({content:"RepeatMode is \`\`AUTOPLAY\`\`"}, {reply: message});
      } else if (c === "off" || c === "disable") {
        queue.setRepeatMode(QueueRepeatMode.OFF);
        message.channel.send({content:"RepeatMode is \`\`off\`\`"}, {replay: message});
      } else {
        if (queue.repeatMode === 0){
			    queue.setRepeatMode(QueueRepeatMode.TRACK); // or 1 instead of RepeatMode.SONG
			    message.channel.send({content:"Now repeating \`\`one song\`\`"}, {reply: message});
		    } else if (queue.repeatMode === 1) {
			    queue.setRepeatMode(QueueRepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
			    message.channel.send({content:"Now repeating \`\`all queue\`\`"}, {reply: message});
		    } else if (queue.repeatMode === 2) {
          queue.setRepeatMode(QueueRepeatMode.AUTOPLAY); // or 0 instead of RepeatMode.DISABLED
          message.channel.send({content:"Repeat is \`\`AUTOPLAY\`\`"}, {reply: message});
        } else if (queue.repeatMode === 3) {
          queue.setRepeatMode(QueueRepeatMode.OFF);
          message.channel.send({content:"RepeatMode is \`\`off\`\`"}, {replay: message});
        }
      }
    }
  } else {
    message.channel.send({content:"You can't hear my music if you're not in a voice channel :cry:"}, { reply: message });
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['loop'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'repeat',
	category: 'music',
	description: 'for repeat song automatically',
	usage: '$repeat'
}
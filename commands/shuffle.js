const Discord = require('discord.js')
const config = require("../config.js")

exports.run = async (bot, message, args, command, db) => {

  let queue = bot.player.getQueue(message.guild.id);
  if (!message.member.voice.channel) return message.channel.send({content: "⚠️ You can't use this command if you are not in my voice channel"});
    if (!queue || !queue.playing) return message.channel.send({content: "I'm not playing anything"});
      queue.shuffle();
      message.channel.send({content:"Queue shuffled successfully 🔀"});
      /*if(serverQueue.shuffle){
			  serverQueue.shuffle = false;
			  message.channel.send({content:"Shuffle is now disabled"}, {reply: message});
		  } else{
			  serverQueue.shuffle = true;
			  message.channel.send({content:"Shuffle is now enabled"}, {reply: message});
		  }*/
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'shuffle',
	category: 'music',
	description: 'for playing random song automatically',
	usage: '$shuffle'
}
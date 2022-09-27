const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  var maquina = [
          "│🍋│🍋│🍋│", 
          "│🍅│🍇│🍒│", 
          "│🍉│🍓│🍅│", 
          "│🍋│🍏│🍉│", 
          "│🍏│🍉│🍓│", 
          "│🍐│🍊│🍆│", 
          "│🍇│🍒│🍐│", 
          "│🍊│🍆│🌽│", 
          "│🍋│🍌│🍑│", 
          "│🌽│🍋│🍌│", 
          "│🍆│🌽│🍋│"
        ]
        var niquel = maquina[Math.floor(Math.random() * maquina.length)];

        

             const embed = new Discord.EmbedBuilder()
             .setTitle("**slot machine**")
             .setColor("BLACK")
             .setAuthor({
               name: message.author.username,
               iconURL: message.author.displayAvatarURL()
             })
             .setDescription(niquel)
             message.channel.send({embeds: [embed]})
}
  
  exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['slotmachine', 'slot-machine'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'slot',
	category: 'fun',
	description: 'Win money by betting, but remember, you can lose everything!',
	usage: '$slot'
};
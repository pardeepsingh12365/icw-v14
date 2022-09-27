const Discord = require("discord.js");
const config = require("../config.js");
const lang_trans = require("../modules/lang_trans")

exports.run = async (bot, message, args, command, db) => {
  var question = args.join("").substring(command.length);
  var answers = config.eightBall;
  if (!question) return message.reply("no question in input")//.then(msg => setTimeout(() => msg.delete(), 5000));
  var a = Math.floor(Math.random() * answers.length);

  let ballembed = new Discord.EmbedBuilder()
    .setAuthor({
      name: message.author.username.toString(),
      iconURL: message.author.displayAvatarURL({extension: "png",dynamic: true,size: 256})
    })
    .setColor("BLACK")
    .addFields([
      {name: ":question: Question",value: `${question}`},
      {name: ":8ball: 8ball",value: `${answers[a]}`}
    ])
    .setImage(config.icwflahimg)
    .setFooter({
      text: `${bot.user.username}™ | Developed by: PK#1650 `,
      iconURL: `${config.pkflashlogo}`
    })
    .setTimestamp();
  //lang_trans.lt({embeds: [ballembed]},message.channel)
  message.channel.send({embeds: [ballembed]});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["8-ball"],
  permLevel: "No permission need",
  manu: false
};

exports.help = {
  name: "8ball",
  category: "fun",
  description: "ask it a question",
  usage: "$8ball <your question>"
};

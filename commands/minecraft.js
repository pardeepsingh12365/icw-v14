const Discord = require('discord.js')
const nodefetch = require('node-fetch');
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let args2 = args.join('').substring(command.length)
  let [title, contents] = args2.split("|");
  if(!args2) return message.reply(`No args after commandlike \`\`${config.prefix}minecraft test\`\``);
  if(!contents) {
    [title, contents] = ["Achievement Get!", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args2.toLowerCase().includes("queimar")) rnd = 38;
  if(args2.toLowerCase().includes("biscoito")) rnd = 21;
  if(args2.toLowerCase().includes("bolo")) rnd = 10;
  if(args2.toLowerCase().includes("diamante")) rnd = 29;

  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  nodefetch.get(url)
   .then(r=> message.channel.send({files:[{attachment: r.body}]}));
}

exports.conf = {
	enabled: false,
	guildOnly: false,
	aliases: ['craft'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'minecraft',
	category: 'fun',
	description: 'craft something for fun with minecraft skins',
	usage: '$minecraft <anything>'
};
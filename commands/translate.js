const Discord = require('discord.js')
const config = require("../config.js")
const lang = require("../lang.json")
const translate = require('@vitalets/google-translate-api');
exports.run = async (bot, message, args, command, db) => {
  let arg = args.join().substring(command.length);
  if (!arg) return message.channel.send({content:`***plz add a message after command***`});
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  var language;
  if (lang.langmatch.includes(c)) {
    let cl;
    if (c === "chinese") {
      cl = "zh-CN"
    } else {
      cl = c
    }
    let msg = arg.substring(c.length)
    translate(msg, {to: cl}).then(res => {
      message.channel.send({content:res.text},{ disableMentions: "all" });
    }).catch(err => {
      message.channel.send({content:"err: "+err});
  });
  } else {
    translate(arg, {to: 'english'}).then(res => {
      message.channel.send({content:res.text},{ disableMentions: "all" });
    }).catch(err => {
      message.channel.send({content:"err: "+err});
    });
  }
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['t','tr','trans','translati'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'translate',
	category: 'useful',
	description: 'for send a suggestion',
	usage: '$translate <message>\n$translate language <message>'
};
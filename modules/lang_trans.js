const Discord = require('discord.js')
const config = require("../config.js")
const lang = require("../lang.json")
const translate = require('@vitalets/google-translate-api');
module.exports.lt = async (message, textChannel) => {
  //let arg = args.join().substring(command.length);
  if (!message) return textChannel.send({content:`***plz add a message after command***`});
  //if (message.embeds) return
  translate(message.content, {to: 'hindi'}).then(res => {
    textChannel.send({content:res.text},{ disableMentions: "all" });
  }).catch(err => {
    textChannel.send({content:"err: "+err});
  });
}
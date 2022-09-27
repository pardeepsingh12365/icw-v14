const Discord = require("discord.js");
const config = require("../config.js")
const request = require("request")
exports.run = async (bot, message, args, command, db) => {
  const args3 = args.join(" ").substring(command.length);
  if (!args3) return message.channel.send({content:`please provide a input after command`})

    const http = require("http")
    
    try {
      fetch("https://www.cleverbot.com/webservicemin?uc=UseOfficialCleverbotAPI&", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "text/plain;charset=UTF-8",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "cookie": "XVIS=TEI939AFFIAGAYQZ; __gads=ID=4214cdd81e824599:T=1591662938:S=ALNI_MYH2z7ixQ93O_sUSeTro2sXNjWJIw; _cbsid=-1; __utmc=223276361; __qca=P0-1710246137-1591662958387; CBALT=1~We are never ever ever getting back together. Do you go talk to your friends talk to my friends talk to me.; GED_PLAYLIST_ACTIVITY=W3sidSI6IjhBWmkiLCJ0c2wiOjE1OTE2NjM3NjksIm52IjowLCJ1cHQiOjE1OTE2NjMzNzYsImx0IjoxNTkxNjYzNjkyfSx7InUiOiJ0VDFNIiwidHNsIjoxNTkxNjYzMzc0LCJudiI6MCwidXB0IjoxNTkxNjYzMjY5LCJsdCI6MTU5MTY2MzI4OX1d; udmsrc=%7B%7D; __utmz=223276361.1592454225.2.2.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utmt=1; __utma=223276361.1879241020.1591662936.1591662936.1592454207.2; __utmb=223276361.1.10.1592454225; note=1"
        },
        "referrer": "https://www.cleverbot.com/",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "stimulus="+args3+".&cb_settings_scripting=no&islearning=1&icognoid=wsf&icognocheck=d4ef2eb8c791c8e8ebe3cc8d712a990f",
        "method": "POST",
        "mode": "cors"
      })
      //.then(res => console.log(res))//.text())
      .then(body => console.log(body));

    } catch (err) {
      message.channel.send({content:`❌ ${err}`})
    }

}

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 'No permission need',
    manu: false
};

exports.help = {
    name: 'clv',
    category: 'useful',
    description: 'new cleverbot',
    usage: '$clv <message>'
};
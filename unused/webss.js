const Discord = require("discord.js");
const config = require("../config.js")
const request = require("request")
const fetch = require("node-fetch")
exports.run = async (bot, message, args, command, db) => {
let args2 = args.join("").substring(command.length);
if (!args2) return message.channel.send({content:`***plz add a website url after command***`});
  let searchMessage = await message.channel.send({content:'Searching... Sec.'});
  try {
    fetch( 
      "https://icw-api.herokuapp.com/ss?url=" + args2
      ///"https://icw-api.glitch.me/ss?url=" + args2 
    )
    .then(data => {return data.json()})
    .then(res => {
      var data = res
      if (data.cod == "404") {
        searchMessage.edit({content:data.error});
        return undefined;
      } else {
        if(!message.channel.nsfw && data.nsfw) return searchMessage.edit({content:`you provided a nsfw website url and this channel is non-nsfw\ntry it in nsfw channel`})
        let  img =  Buffer.from(data.image , 'base64');
        const embed = new Discord.MessageEmbed() 
        .setDescription(`${data.url}`)
        .attachFiles({ attachment: img , name: "webss.png" })
        .setImage("attachment://webss.png")
        searchMessage.delete()
        message.channel.send({ embeds: [embed] });
      }
    }).catch(error => {searchMessage.edit({content: `Error: ${error}`}) })
  } catch(error) {
    searchMessage.edit({content:"somthing wrong"})//(error)
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
    name: 'webss',
    category: 'images',
    description: 'get screenshot of a website',
    usage: '$webss <website url>'
};
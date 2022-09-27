const Discord = require("discord.js");
const config = require("../config.js")
const request = require("request")
exports.run = async (bot, message, args, command, db) => {
  const args3 = args.join(" ").substring(command.length);
  if (!args3) return message.channel.send({content:`please provide a pokemon name after command`})

    const http = require("http")
    
    try {
      request(
      {
        url: "https://some-random-api.ml/pokedex?pokemon=" + args3
      },(error, response, body) => {
        var data = JSON.parse(body);
        if (data.error) return message.channel.send({content:data.message})
        //console.log(data)
        let hugEmbed = new Discord.EmbedBuilder()
        .setAuthor({
          name: `name: ${data.name} (id: ${data.id})`
        })
.setDescription(`**type:**            ${data.type}
**species:**       ${data.species}
**abilities:**      ${data.abilities}
**height:**         ${data.height}
**weight:**         ${data.weight}
**gender:**         ${data.gender}
**generation**       ${data.generation}
**egg groups:**      ${data.egg_groups}
**base experience:** ${data.base_experience}
**stats:** \`\`\`hp: ${data.stats.hp}  attack: ${data.stats.attack}  defense: ${data.stats.defense}  sp_atk: ${data.stats.sp_atk}
sp_def: ${data.stats.sp_def}  speed: ${data.stats.speed} total: ${data.stats.total}\`\`\`
**description:** \`\`\`${data.description}\`\`\`
`)
          .setThumbnail(data.sprites.normal)
          .setImage(data.sprites.animated ? data.sprites.animated : data.sprites.normal)
          .setURL("https://icwbot.glitch.me")
          .setColor("BLACK")
          message.channel.send({embeds: [hugEmbed]})
        })
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
    name: 'pokemon',
    category: 'fun',
    description: 'get pokemon info with image',
    usage: '$pokemon <pokemon name>'
};
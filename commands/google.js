const Discord = require('discord.js')
const config = require("../config.js")
const nsfwword = require("../nsfwword")
const googleit = require('google-it')//-safesearch');
exports.run = async (bot, message, args, command, db) => {
  let input = args.join("").substring(command.length);
  if (!input) return message.channel.send({content:"please provide a input after command"})
  let searchMessage = await message.reply('Searching... Sec.');
  let c = input.split(" ").filter(e => nsfwword.adultsword.includes(e))
  if (c.length > 0) {
    return searchMessage.edit(" >>> dont use bad word please")
  } else {
    googleit({
      query: input,
      safe: "high",
      ageRestriction: true,
      disableConsole: true
    }).then(results => {
      //console.log(results)      
      searchMessage.edit(`Result found!\n${results [0].link}`);
    }).catch((err) => {
      console.log(err)
      bot.channels.cache.get(config.botrejectionschannel).send({content:`${message.author.username} using google command in dm \n${err}`})
      searchMessage.edit('No results found!');
    });
  }
}

exports.conf = {
	enabled: false,
	guildOnly: false,
	aliases: ['gsearch', 'googleit','g'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'google',
	category: 'useful',
	description: 'for search anything on google',
	usage: '$google <anything>'
};
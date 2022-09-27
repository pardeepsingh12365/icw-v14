const Discord = require('discord.js')
const {
  MessageEmbed, Collection, Permissions
} = require(`discord.js`);
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let arg = args.join("").substring(command.length);
  
  if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({content:"Incorrect permissions (You need the manage messages permissions to do this)"});
  let mem = message.mentions.members.first();
  if (mem) {
    
    
    
    if (mem.user.id === bot.user.id) {
      let args1 = arg.split(`<@!${mem.user.id}>`).join().substring(2);
      let args2 = parseInt(args1)
      console.log(args2)
      if (!args2 || args2 < 2 || args2 > 100 || isNaN(args2)) return message.channel.send({content:`Please provide a number after command between 2 and 100 for delete the messages like \`\`${config.prefix}purge @member 5\`\``});

      let messageCollection = new Collection(); //make a new collection
      let channelMessages = await message.channel.messages.fetch({ //fetch the last 100 messages
          limit: 100
      }).catch(() => {})
      messageCollection = messageCollection.concat(channelMessages.filter(msg => msg.author.id == mem.user.id)); //add them to the collection
      let msgs = messageCollection.map(this_Code_is_by_Tomato_6966 => this_Code_is_by_Tomato_6966)
      //for(let i = 0; i < msgs.length; i+=100)
      await message.channel.bulkDelete(msgs.slice(0, (+args2 + 1))/*(i, i+100)*/)
      
      /*const fetched = await message.channel.messages.fetch({ limit: 100 });
      const filter = fetched.filter(m => m.author.id === mem.id).array().slice(0, args2)
      filter.forEach(
        msg => msg.delete()
      )*/
      //message.channel.bulkDelete(filter).catch(function(error) { message.reply(`Couldn't delete messages because of: ${error}`); });
      message.channel.send({content:`***${args2} messages deleted successfully by ${message.author.tag} with purge command***`})
        .then(msg => setTimeout(() => msg.delete(), 3000));
      
    } else {
      if (!message.guild.members.cache.get(bot.user.id).permissions.has("MANAGE_MESSAGES")) return message.channel.send({content:`I don't have permission to do that give me manage message permission`});
      let args1 = arg.split(`<@!${mem.user.id}>`).join().substring(2)
      let args2 = parseInt(args1)

      if (!args2 || args2 < 2 || args2 > 100 || isNaN(args2)) return message.channel.send({content:`Please provide a number after command between 2 and 100 for delete the messages like \`\`${config.prefix}purge @member 5\`\``});
 
      let messageCollection = new Collection(); //make a new collection
      let channelMessages = await message.channel.messages.fetch({ //fetch the last 100 messages
          limit: 100
      }).catch(() => {})
      messageCollection = messageCollection.concat(channelMessages.filter(msg => msg.author.id == mem.user.id)); //add them to the collection
      let msgs = messageCollection.map(this_Code_is_by_Tomato_6966 => this_Code_is_by_Tomato_6966)
      //for(let i = 0; i < msgs.length; i+=100)
      await message.channel.bulkDelete(msgs.slice(0, (+args2 + 1))/*(i, i+100)*/)
      
      /*const fetched = await message.channel.messages.fetch({ limit: 100 });
      const filter = fetched.filter(m => m.author.id === mem.id).array().slice(0, args2)
      message.channel.bulkDelete(filter).catch(function(error) { message.channel.send({content:`Couldn't delete messages because of: ${error}`}); });*/
      
      message.channel.send({content:`***${args2} messages deleted successfully by ${message.author.tag} with purge command***`})
        .then(msg => setTimeout(() => msg.delete(), 3000));
    }
  } else {
    if (!message.guild.members.cache.get(bot.user.id).permissions.has("MANAGE_MESSAGES")) return message.channel.send({content:`I don't have permission to do that give me manage message permission`});
    if (!arg || arg < 2 || arg > 99 || isNaN(arg)) return message.channel.send({content:`Please provide a number after command between 2 and 99 for delete the messages like \`\`${config.prefix}purge 5\`\``});
    const fetched = await message.channel.messages.fetch({ limit: parseInt(arg)+ 1 });
    message.channel.bulkDelete(fetched).catch(function(error) { message.reply({content:`Couldn't delete messages because of: ${error}`}); });
    message.channel.send({content:`***${arg} messages deleted successfully by ${message.author.tag} with purge command***`})
      .then(msg => setTimeout(() => msg.delete(), 3000));
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['prune', 'delete', 'clear'],
	permLevel: 'MANAGE_MESSAGES',
  manu: false
};

exports.help = {
	name: 'purge',
	category: 'modration',
	description: 'for delete multiple message 2 to 100',
	usage: '$purge 5  /  $purge @member 5' 
}
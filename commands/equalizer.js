const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
   if (message.author.id !== config.botowner) {
         message.reply('this command is only for bot owner!!!');
         return undefined;
   }
  bot.eq = new Map()
  const band0= '^\`\`\`';
  
    const done = new Discord.MessageEmbed()
    .setAuthor("ICW Muusic Control Panel")
    .setColor(15724786)
    .setDescription(`\`\`\`js
               EQUALIZER                    

\`\`\`
\`\`\`
+1.00 |                              
+0.75 |                              
+0.50 |                              
+0.25 |                              
+0.00 | ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄
-0.25 | ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄
        0 1 2 3 4 5 6 7 8 9 A B C D E
        ${band0}`)
    .setFooter("ICW™")
    
 
  message.channel.send({embeds: [done]}).then(msg => { 
   
    msg.react('◀️').then(msg.react('▶️') && msg.react('🔼') && msg.react('🔽') && msg.react('⏺️') && msg.react('⏹️').then( r => { 
      
      const backwardFilter = (reaction, user) => reaction.emoji.name === '◀️' && user.id === message.author.id;
      const forwardFilter = (reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id;
      const upFilter = (reaction, user) => reaction.emoji.name === '🔼' && user.id === message.author.id;
      const downFilter = (reaction, user) => reaction.emoji.name === '🔽' && user.id === message.author.id; 
      const recordFilter = (reaction, user) => reaction.emoji.name === '⏺️' && user.id === message.author.id; 
      const stopFilter = (reaction, user) => reaction.emoji.name === '⏹️' && user.id === message.author.id; 
      
      const backward = msg.createReactionCollector(backwardFilter/*, { time: 60000 }*/); 
      const forward = msg.createReactionCollector(forwardFilter/*, { time: 60000 }*/); 
      const up = msg.createReactionCollector(upFilter/*, { time: 60000 }*/); 
      const down = msg.createReactionCollector(downFilter/*, { time: 60000 }*/); 
      const record = msg.createReactionCollector(recordFilter/*, { time: 60000 }*/); 
      const stop = msg.createReactionCollector(stopFilter/*, { time: 60000 }*/);
      
      //let des = msg.embeds[0].description
      //let sliceband = des.slice(336)
//-------------------backward----------------------

    backward.on('collect', r => {
      let ru = r.users.cache.map(u => u.id).slice(-1)
      let m = msg.channel.lastMessage.embeds[0].description
      let sliceband = m.slice(336)
        console.log(sliceband.length)

        if (sliceband.length > 6) {
          sliceband[2] = sliceband.slice(2)
        } else {
          sliceband[2] = '                            ^\`\`\`';
        }
        console.log(`${sliceband[2]}`)
           const done2 = new Discord.MessageEmbed()
    .setAuthor("ICW Muusic Control Panel")
    .setColor(15724786)
    .setDescription(`\`\`\`js
               EQUALIZER                    

\`\`\`
\`\`\`
+1.00 |                              
+0.75 |                              
+0.50 |                              
+0.25 |                              
+0.00 | ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄
-0.25 | ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄
        0 1 2 3 4 5 6 7 8 9 A B C D E
        ${sliceband[2]}`)
      .setFooter("ICW™")
          msg.edit({embeds: [done2]})
          r.users.remove(ru[0]);
      });

//--------------------forword----------------------

  forward.on('collect', r => {
    let ru = r.users.cache.map(u => u.id).slice(-1)
    let m = msg.channel.lastMessage.embeds[0].description
      let sliceband = m.slice(336)
      for(var i=0; i<2; i++) {
          sliceband = ` ${sliceband}`;
        }
        console.log(sliceband.length)
        
        if (sliceband.length > 32) {
          sliceband[2] = sliceband.slice(30)
        } else {
          sliceband[2] = sliceband
        }
        
           const done2 = new Discord.MessageEmbed()
    .setAuthor("ICW Muusic Control Panel")
    .setColor(15724786)
    .setDescription(`\`\`\`js
               EQUALIZER                    

\`\`\`
\`\`\`
+1.00 |                              
+0.75 |                              
+0.50 |                              
+0.25 |                              
+0.00 | ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄
-0.25 | ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄ ▄
        0 1 2 3 4 5 6 7 8 9 A B C D E
        ${sliceband[2]}`)
      .setFooter("ICW™")
          msg.edit({embeds: [done2]})
      r.users.remove(ru[0]);
    })
      
    up.on('collect', r => { 
      
      r.remove(message.author.id);
    })
     
      down.on('collect', r => {
        
        r.remove(message.author.id);
      })
      
      stop.on('collect', r => {
        
        r.remove(message.author.id);
      })
   
    })
  )}
)}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['eq'],
	permLevel: 'bot owner only',
  manu: false
};

exports.help = {
	name: 'equalizer',
	category: 'owner-only',
	description: 'for changing equalizer of music player',
	usage: '$equalizer <band> <gain>'
}
const Discord = require('discord.js')
const config = require("../config.js")
exports.run = async (bot, message, args, command, db) => {
  let arg2 = args.join("").substring(command.length);
    if (!arg2) {
      var music = bot.commands.filter(cmd => cmd.help.category === "music")
      var useful = bot.commands.filter(cmd => cmd.help.category === "useful")
      var modration = bot.commands.filter(cmd => cmd.help.category === "modration")
      var fun = bot.commands.filter(cmd => cmd.help.category === "fun")
      var images = bot.commands.filter(cmd => cmd.help.category === "images")
      var botinfo = bot.commands.filter(cmd => cmd.help.category === "botinfo")
      var settings = bot.commands.filter(cmd => cmd.help.category === "settings")
      var owner = bot.commands.filter(cmd => cmd.help.category === "owner-only")
      
      let guild = new Discord.EmbedBuilder()
     // .setTitle("")
      .setAuthor({name: "Hi " + message.author.username.toString(), iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 256})})
      .setColor("BLUE")
      .setThumbnail(`${config.icwlogo}`)
      .setDescription(`${config.h} ${config.e} ${config.l} ${config.p}\n**ICW help Section**
default prefix is \`\`${config.prefix}\`\` and \`\`(customisable)\`\`
volume and custom welcomer command is for all users
more commands coming soon`)
      .addFields([
        {name : `music (${music.map(cmd => cmd).length})`,value: music.map(cmd => cmd.help.name).join(", ")},
        {name : `useful (${useful.map(cmd => cmd).length})`,value: useful.map(cmd => cmd.help.name).join(", ")},
        {name : `modration (${modration.map(cmd => cmd).length})`,value: modration.map(cmd => cmd.help.name).join(", ")},
        {name : `fun (${fun.map(cmd => cmd).length})`,value: fun.map(cmd => cmd.help.name).join(", ")},
        {name : `images (${images.map(cmd => cmd).length})`,value: images.map(cmd => cmd.help.name).join(", ")},
        {name : `settings (${settings.map(cmd => cmd).length})`,value: settings.map(cmd => cmd.help.name).join(", ")},
        {name : `owner-only (${owner.map(cmd => cmd).length})`,value: owner.map(cmd => cmd.help.name).join(", ")},
        {name : `Important Links`,value: `[Invite](${config.invitelink})  |  [Support](${config.serverinvite})  |  [Website](https://icwbot.glitch.me)`},
        {name : "voting",value: `[DBL](https://top.gg/bot/376292306233458688) | [BOD](https://bots.ondiscord.xyz/bots/376292306233458688) | [Glenn](https://glennbotlist.xyz/bot/376292306233458688)`},
        {name : "help with",value: `[paypal](https://www.paypal.com/paypalme2/icwbot) | [patreon](https://www.patreon.com/icw)`}
      ])
      .setImage(config.icwflahimg)
      .setFooter({text: `${bot.user.username}™ | Developed by: PK#1650 `, iconURL: `${config.pkflashlogo}`})
      .setTimestamp()
      message.channel.send({embeds: [guild]});
      
      /*let helpembed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor("Hi " + message.author.username.toString(), message.author.displayAvatarURL)
      .setDescription(`ICW help Section \nDefault Prefix = ${config.prefix}\nvolume command is for all users \nmore commands coming soon`)
      .addField("Custom Prefix", `set-prefix - (for set the custom prefix for server) \nprefix - (for check the server prefix) \ndelete-prefix - (for delete prefix if you forget your prefix)\`\`$delprefix\`\``)
      .addField("Bot info commands", `ping - (bot ping) \ninvite - (bot invite link)\nbotinfo - (info about the bot)\`\`info , botstatus\`\` \nuptime - (uptime of the bot)`)
      .addField("until commands", `brb- ('for set your  offline status') \ncleverbot - (talk with bot with mention or icw \`\`example - icw hi\`\`) \`\`icw\`\` \nweather - (check your city weather) \nsay - (bot saying your message) \nserverinfo - (info about server)`)
      .addField("Modration command", ` welcome - (welcoming the member) \n purge (delete multiple messages) \`\`delete\`\`, \`\`prune\`\` \n warn - (for warning a member) \n kick - (for kick a member) \n ban - (for ban a member)`)
      .addField("Music commands", `play - (for serach and add your song in thre queue) \`\`p\`\` \npause - (pause the player) \nresume - (resume the player) \nvolume - (set your player volume) \`\`sv , setvolume\`\` \nskip - (for next song) \`\`s , next\`\` \nprev - (for previos song) \nstop - (for stop the player) \nqueue - (for check playlist) \`\`q , playlist\`\` \nsong - (view current song) \`\`np , nowplaying\`\` \nrandom - (playing randomly)`)
      .setThumbnail(`${config.icwlogo}`)
      .setFooter("Bot Developed by: PK#1650 ", `${config.pkflashlogo}`)
      .addField("if you find any bug plz report it with command", `bug-report - (report for any bugs or problams) \`\`bug\`\``)
      .addField("support server", `[link](https://discord.gg/zFDvBay)`, true)
      .addField("bot invite link", `[invite](https://discordapp.com/oauth2/authorize?client_id=376292306233458688&permissions=8&scope=bot)`, true)
      .addField("please give upvote", `[vote and invite link](https://top.gg/bot/376292306233458688)`, true)
      .addField("help with donate", `[patreon](https://www.patreon.com/icw)`, true)
      .setImage(config.icwflahimg)
      .setTimestamp();
      if (message.channel.type === 'dm') {
				message.author.send({
					embed: helpembed
				});
			} else {
				message.author.send({ embed: helpembed });

        message.channel.send("check your dm's").then(msg => { msg.react('📌'); })

			}*/

    } else {
      let  command = arg2;
      if (bot.commands.has(command) || bot.aliases.has(command)) {
			command = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
			var aliases;
			if (command.conf.aliases.length === 0) {
				aliases = 'no aliases';
			} else {
				aliases = command.conf.aliases.toString('');
			}
console.log(aliases)
      const cmdname = command.help.name.replace('a',`${config.a} `)
      .replace('b',`${config.b} `)
      .replace('c',`${config.c} `)
      .replace('d',`${config.d} `)
      .replace('e',`${config.e} `)
      .replace('f',`${config.f} `)
      .replace('g',`${config.g} `)
      .replace('h',`${config.h} `)
      .replace('i',`${config.i} `)
      .replace('j',`${config.j} `)
      .replace('k',`${config.k} `)
      .replace('l',`${config.l} `)
      .replace('m',`${config.m} `)
      .replace('n',`${config.n} `)
      .replace('o',`${config.o} `)
      .replace('p',`${config.p} `)
      .replace('q',`${config.q} `)
      .replace('r',`${config.r} `)
      .replace('s',`${config.s} `)
      .replace('t',`${config.t} `)
      .replace('u',`${config.u} `)
      .replace('v',`${config.v} `)
      .replace('w',`${config.w} `)
      .replace('x',`${config.x} `)
      .replace('y',`${config.y} `)
      .replace('z',`${config.z} `)
      
			var hEmbed = new Discord.EmbedBuilder()
				.setDescription(`**command: ${command.help.name}**`)
				.setColor("BLACK")
				.addFields([
          {name: 'Description',value: command.help.description},
          {name: 'Category',value: command.help.category},
          {name: 'Use',value: command.help.usage},
          {name: 'aliases',value: aliases},
          {name:'Permission',value: command.conf.permLevel}
        ])
				.setImage(config.icwflahimg)
        .setFooter({text: `${bot.user.username}™ | Developed by: PK#1650 `, iconURL: `${config.pkflashlogo}`})
        .setTimestamp()

				message.channel.send({embeds: [hEmbed]});

		} else if (arg2 === 'music' || arg2 === 'useful' || arg2 ===  'modration' || arg2 === 'fun' || arg2 === 'images' || arg2 === 'settings' || arg2 === 'owner-only') {
      //if (bot.commands.map(e => e.help.category !== arg2)) return message.channel.send(`not found`)
      let ctrg = bot.commands.filter(e => e.help.category === arg2)
      const longest = ctrg.map(e => e.help.name).reduce((long, str) => Math.max(long, str.length), 0);
      
      let ctrg2 = ctrg.map(e => e.help.name +`  ${' '.repeat(longest - e.help.name.length)}`+ e.help.description).join('\n')
  
      message.channel.send({content : `\`\`\`ruby\n${arg2} commands: \n${ctrg2}\`\`\``})

    } else {
			return message.reply('no command found with this name');
		}
      
    }
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['halp', 'h','-help'],
	permLevel: 'No permission need',
  manu: false
};

exports.help = {
	name: 'help',
	category: 'useful',
	description: 'for help command',
	usage: '$help / $help <command name>'
};
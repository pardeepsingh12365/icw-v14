const Discord = require("discord.js");
const fs = require("fs");

const { Client, GatewayIntentBits, Partials, MessageActionRow, MessageButton } = require('discord.js');
const bot = new Client({
    intents: [
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ]
});

const { Player } = require("discord-player");
const { registerPlayerEvents } = require('./modules/player_events');
require("discord-player/smoothVolume")

const config = require("./config.js");
const firebase = require("firebase");
const Enmap = require("enmap");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

bot.commands = new Enmap();
bot.aliases = new Enmap();
bot.radio = new Map();
bot.config = require("./config.js");

firebase.initializeApp({
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
});
firebase.auth().signInWithEmailAndPassword(process.env.FB_EMAIL, process.env.FB_PASSWORD);
const db = firebase.database();
bot.db = db;
bot.player = new Player(bot);
registerPlayerEvents(bot.player, bot, db)

//----------------------------------------------------

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    //console.log(`Attempting to load command ${commandName}`);
    bot.commands.set(commandName, props);
  });
});

const init = async () => {
  const cmdFiles = await readdir("./commands/");
  bot.commandsNumber = cmdFiles.length;
  console.log(`total ${bot.commandsNumber} commands loaded`);
  cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`);
      if (f.split(".").slice(-1)[0] !== "js") return;
      bot.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    } catch (e) {
      console.log(`found a error when loading command ${f} error is: ${e}`);
    }
  });

  const evtFiles = await readdir("./events/");
  console.log(`total ${evtFiles.length} events loaded.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    bot.on(eventName, event.bind(null, bot, db));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
};

init();

//---------------------------------------------------------------

bot.on("error", function(err) {
  bot.channels.cache.get(config.boterrorchannel).send({content:err});
});
bot.on("disconnect", function() {
  console.log("Bot disconnected");
  //bot.channels.cache.get(config.botlogchannel).send("bot disconnected");
  process.exit(1);
});

bot.login(process.env.BOTTOKEN).then(function() {
    console.log("Bot logged in");
}).catch(console.log);


bot.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
		await interaction.followUp('Pong again!');
	}
});


/*---------------------------------------------------------------------------------------------------------------
            MESSAGE COMMANDS
---------------------------------------------------------------------------------------------------------------*/

bot.on("messageCreate", async message => {
  if (message.author.bot) return undefined;
  //const hasvoted = await dbl.hasVoted(message.author.id);
  if (message.channel.type == "dm" || message.channel.type == "group") {
    if (config.blacklist.users.includes(message.author.id)) return;
    //if (!message.channel.type == "dm" || !message.channel.type == "group") return undefined;
    //if (message.guild) return undefined;
    var args;
    var comarg;
    args = message.content.substring(config.prefix.length + 1).split();
    comarg = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = comarg.shift().toLowerCase();
    if (!command) return;
    const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    if (!cmd) return;
    if (cmd.conf.guildOnly) {
      return message.channel.send({content:"cant run this command in dm channel"});
    } else {
      if (cmd.conf.enabled === false) return message.channel.send({content:"this command is disable because its under construction"});
      cmd.run(bot, message, args, command, db, /*hasvoted*/);
    }
  } else {
    //if (!message.channel.type == "dm" || !message.channel.type == "group") {
    //});

    /*-----------------------------------------------------------------------------------------------------------------------
                SERVERS COMMANDS
-------------------------------------------------------------------------------------------------------------------------*/
    //bot.on("message", async message => {
    //const sstatus = (await db.ref(`bot/`).child("sstatus").once("value")).val();
    //bot.user.setPresence({status: `streaming`,activity: {name: `${sstatus}`,type: `STREAMING`,url: `https://www.twitch.tv/pardeepsingh12365`} });

    //------------------------------------------------------------

    //if (message.author.bot) return undefined;

    //if (message.channel.type == "dm" || message.channel.type == "group") return;
    if (config.blacklist.users.includes(message.author.id) ||config.blacklist.guilds.includes(message.guild.id))return;

    if (message.content.startsWith(`<@${bot.user.id}>`) ||message.content.startsWith(`<@!${bot.user.id}>`)) {
      const gprefix = (await db.ref(`servers/${message.guild.id}`).child("guildprefix").once("value")).val();
      message.channel.send({content:`The current prefix is \`\`${gprefix ? gprefix : `${config.prefix}`}\`\` for ${message.guild.name}.\n custom prefix change to slash command soon`});
    }
    //----------------------------------------------------------
    const mentionuser = message.mentions.members.first();
    if (mentionuser) {
      const brbstatus = (await db.ref(`users/${mentionuser.user.id}`).child("brbmessage").once("value")).val();
      if (brbstatus !== null || brbstatus) {
        //if (mentionuser.presence.status === "offline") {
          message.channel.send({content:`hey <@${message.author.id}>, ${mentionuser.user.username} is ${brbstatus}`});
        //} else {
          //return undefined;
        //}
      }
    }
    
    
    /*const brbstatus2 = (await db.ref(`users/${message.author.id}`).child("brbmessage").once("value")).val();
    if (brbstatus2 !== null || brbstatus2) {
      db.ref('users/' + message.author.id).child('brbmessage').remove().catch(function(err) { bot.channles.cache.get(config.boterrorchannel).send({content:err + "\n\n\n"}); });
      message.channel.send({content:`hey <@${message.author.id}> you are back so your afk status is cleared`})
    }*/

    //------------------------------------------------------------
    var cprefix;
    const gprefix = (await db.ref(`servers/${message.guild.id}`).child("guildprefix").once("value")).val();
    if (!gprefix || gprefix === null) {
      cprefix = config.prefix;
    } else {
      cprefix = gprefix;
    }

    if (!message.content.startsWith(cprefix)) return undefined;
    //if (message.content.startsWith(cprefix)) {
    var args = message.content.substring(cprefix.length + 1).split();
    var comarg = message.content.slice(cprefix.length).trim().split(/ +/g);
    /*} else {
    args = message.content.substring(config.prefix.length + 1).split();
    comarg = message.content.slice(config.prefix.length).trim().split(/ +/g);
  }*/
    const command = comarg.shift().toLowerCase();

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    if (!command) return;
    const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
    if (!cmd) {
      return;
    } else {
      if (cmd.conf.enabled === false && message.author.id !== config.botowner) return message.channel.send({content:"this command is disable because its under construction"});
      try {
        cmd.run(bot, message, args, command, db, /*hasvoted*/);
      } catch (error){
        message.channel.send({content:'an error occurred:\n'+error})
      }
    }
  }
});
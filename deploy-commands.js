const { SlashCommandBuilder, Routes, } = require('discord.js');
const { REST } = require('@discordjs/rest');
//const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('serverinfo').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
  
  //new SlashCommandBuilder().setName('play').setDescription('Enqueues a song for playing')
        //.addStringOption(option => option.setName("search_title").setDescription("Song to play").setRequired(true)),
  //new SlashCommandBuilder().setName('leave').setDescription('Leaves the voice channel'),
	//new SlashCommandBuilder().setName('resume').setDescription('Resume the paused song'),
	//new SlashCommandBuilder().setName('pause').setDescription('Pause the current song'),
	//new SlashCommandBuilder().setName('next').setDescription('Go to the next song'),
	//new SlashCommandBuilder().setName('prev').setDescription('Go to the previous song'),
	//new SlashCommandBuilder().setName('queue').setDescription('Show the current playlist')
]
	.map(command => command.toJSON());

const clientId = '939139758809038868'
const guildId = '937941608865869824'
const rest = new REST({ version: '10' }).setToken(process.env.BOTTOKEN);


	try {
		console.log('Started refreshing application (/) commands.');

		rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}

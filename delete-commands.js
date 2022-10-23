const { REST, Routes } = require('discord.js');
const { clientId } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

// for guild-based commands
rest.delete(Routes.applicationGuildCommand(clientId, "956319785434619944", '1025679972356063272'))
	.then(() => console.log('Successfully deleted potes à la compote command'))
	.catch(console.error);

// for guild-based commands
rest.delete(Routes.applicationGuildCommand(clientId, "612095258578255893", '1024688175781777528'))
	.then(() => console.log('Successfully deleted bonsai command'))
	.catch(console.error);
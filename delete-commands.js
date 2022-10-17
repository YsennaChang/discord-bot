const { REST, Routes } = require('discord.js');
const { clientId } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


// for global commands
rest.delete(Routes.applicationCommand(clientId, '1025679972356063272'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);
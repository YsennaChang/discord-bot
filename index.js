const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, GatewayIntentBits} = require('discord.js');
const schedule = require("node-schedule");
const flatCache = require("flat-cache"); // gestionnaire de kv
const kv = flatCache.load("cacheId")
const { key, guildId, channelId, derbyPollTime, removeRoleTime, enPollTime, derbyStartTime } = require("./utils/variables");
require ("dotenv").config();

const client = new Client({ 
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent
   ],
   partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

//======> Declare all function files <======//

// add commands collection
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// add schedules collection
client.schedules = new Collection();
const schedulesPath = path.join(__dirname, 'schedules');
const scheduleFiles = fs.readdirSync(schedulesPath).filter(file => file.endsWith('.js'));

for (const file of scheduleFiles) {
   const filePath = path.join(schedulesPath, file);
   const schedule = require(filePath);
   // Set a new item in the Collection with the key as the schedule name and the value as the exported module
   client.schedules.set(schedule.name, schedule)
}

// add reactions collection
client.reactions = new Collection();
const reactionsPath = path.join(__dirname, 'reactions');
const reactionFiles = fs.readdirSync(reactionsPath).filter(file => file.endsWith('.js'));

for (const file of reactionFiles) {
   const filePath = path.join(reactionsPath, file);
   const reaction = require(filePath);
   // Set a new item in the Collection with the key as the schedule name and the value as the exported module
   client.reactions.set(reaction.name, reaction)
} 

//======> Declare all event <======//

client.on('ready', async c => {

   console.log(`Ready! Logged in as ${c.user.tag}`);

   //Derby Poll at Sunday 18 PM
   schedule.scheduleJob(derbyPollTime, ()=> {
      const guild = c.guilds.fetch(guildId);
      guild.then((g) => {
         const channel  = g.channels.cache.get(channelId);
         const members = g.members.cache;
         const schedule = c.schedules.get("derby_poll");
         schedule.execute(channel, members, kv);
      }).catch( e => console.error(e))
   })

   // Remove Role at Monday 10 AM
   schedule.scheduleJob(removeRoleTime, ()=> {
      const pollData = kv.getKey(key);
      const guild = c.guilds.fetch(guildId);
      guild.then((g) => {
         const channel = g.channels.cache.get(channelId);
         const members = g.members.cache;
         const msg = channel.messages.cache.get(pollData.embed_id)
         const schedule = c.schedules.get("remove_role");
         schedule.execute(members, msg);
      }).catch( e => console.error(e))
   })
   
   // End Poll at Tuesday 9:30 AM
   schedule.scheduleJob(enPollTime, ()=> {
      // Clean up kv to end the poll
      kv.removeKey(key);
      const guild = c.guilds.fetch(guildId)
      guild.then((g) => {
         const channel = g.channels.cache.get(channelId);
         const schedule = client.schedules.get("end_poll");
         schedule.execute(channel);
      })
      
   })
   // Derby Start at Tuesday 10 AM
   schedule.scheduleJob(derbyStartTime, ()=> {
      const guild = c.guilds.fetch(guildId)
      guild.then((g) => {
         const channel = g.channels.cache.get(channelId);
         const schedule = client.schedules.get("derby_start");
         schedule.execute(channel);
      })
   })
   
});

client.on("messageReactionAdd", async (react, user) => {
   // Exclude if bot
   if (user.bot) return console.log(`Reacted by a bot`);
   // Ensure it's the poll message
   const pollData = kv.getKey(key);
   if (!pollData) return console.log('No poll');
   if (pollData.embed_id !== react.message.id) return console.log('Not the poll message');
   // read add.js file
   const reaction = client.reactions.get("add");
   reaction.execute(react, user, pollData);

})

client.on("messageReactionRemove", async (react, user) => {
   // Exclude if bot
   if (user.bot) return console.log(`Reacted by a bot`);
   // Ensure it's the poll message
   const pollData = kv.getKey(key);
   if (!pollData) return console.log('No poll');
   if (pollData.embed_id !== react.message.id) return console.log('Not the poll message');

   // read remove.js file
   const reaction = client.reactions.get("remove");
   reaction.execute(react, user, pollData);
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
   const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// connecter le script au bot discord
client.login(process.env.TOKEN);

//need to test something on Gaming Serv

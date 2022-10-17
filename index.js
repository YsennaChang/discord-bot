const {Client, GatewayIntentBits, Partials} = require('discord.js');

const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember} = Partials;
const client = new Client({ 
   intents: [Guilds, GuildMembers, GuildMessages],
   partials: [ User, Message, GuildMember, ThreadMember]
});

client.once('ready', () => {
   console.log('Félicitations, votre bot Discord a été correctement initialisé !');
});

client.login(process.env.TOKEN);
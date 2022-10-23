const {generateFields} = require ('../utils/fields.js');
const {
    emojiCheck,
    emojiX
} = require('../utils/emojis.js');

const {
    key,
    timeBetweenPollDerby, delay,
    roleToTagId,
    botColor, banniereURL
} = require('../utils/variables.js');

// init global variables
var taggedMembers = [];
var p = new Map(); //Members that reacted to the poll
var afk = new Map(); // afk members
var r = []; //remain members that hasn't reacted yet of the called team


let start = Math.floor(Date.now()/ 1000);
let end = start + timeBetweenPollDerby; // début du derby
let leftTime = end - delay; // clôture des inscriptions

module.exports = {
  name : "derby_poll",
  async execute(channel, members, kv) {
    // Retrieve members of the choosen team (their reactions aint an option)
    for (let member of members) {
      if (member[1]._roles.includes(roleToTagId)) {
        taggedMembers.push(member[0]);
      }
    }

    // Create embeds Messages
    const embed = {
      type : "rich",
      title : `Participation au Derby`,
      description : `Seras-tu dispo pour le prochain Derby?`,
      color : botColor,
      fields : generateFields(end, leftTime, p, taggedMembers, afk),
      image: {
        url: banniereURL,
        height: 0,
        width: 0
      },
      footer: {
        text: `Réagissez avec la réaction ${emojiCheck} pour participer ou ${emojiX} si vous ne pouvez pas`,
        icon_url: `https://cdn.discordapp.com/attachments/612095259018526749/1023532594790404166/potealacompote.png`
      }
    }

    const pollEmbed = await channel.send({ embeds : [embed]})
    
    //Add Reactions
    pollEmbed.react(emojiCheck)
    .then( () => pollEmbed.react(emojiX))
    .catch( err => console.log(err))
    
    // Create storage and store the relative date in milliseconde of the poll
    await kv.setKey(
      key, {
        embed_id: pollEmbed.id,
        end, // début du derby
        leftTime, // clôture des inscriptions
        taggedMembers, 
        r
      })

    await console.log(kv.getKey(key))
  }
}
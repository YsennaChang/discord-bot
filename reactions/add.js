const {roleToAddId} = require('../utils/variables.js');
const {generateFields} = require('../utils/fields.js')
const {emojiCheck, emojiX} = require('../utils/emojis.js');

module.exports = {
  name : "add",
  async execute(react, user, pollData) {

    let member = react.message.guild.members.cache.find(member => member.id === user.id)
    var p = [];
    var afk = [];
    var r = [];
    
    // add roleToAdd to the reactedmember
    if (react.emoji.name === emojiCheck && 
      !member.roles.cache.some((role) => role === roleToAddId)) {
      await member.roles.add(roleToAddId);
    }
    // remove roleToAddId from afk
    if (react.emoji.name === emojiX && 
      member.roles.cache.some((role) => role === roleToAddId)) {
      await member.roles.remove(roleToAddId);
    }

    // Populate p
    const pReact = react.message.reactions.cache.get(emojiCheck);
    const checkMembers = await pReact.users.fetch();
    p = checkMembers.filter(member => !member.bot);

    // populate afk
    const xReact = react.message.reactions.cache.get(emojiX);
    const xMembers = await xReact.users.fetch();
    afk = xMembers.filter(member => !member.bot);

    // dismiss the other react when both Check and X are reacted
    if (p.some((m) => m.id === member.id) && 
    afk.some((m) => m.id === member.id)) {
      if (react.emoji.name === emojiCheck) {
        await react.message.reactions.cache.get(emojiX).users.remove(member.id);

        // splice that user from afk
        for (let i = 0; i < afk.length; i++) {
          if (
            afk[i].id === member.id
          ) {
            afk.splice(i,1);
          }
        }
      } else if (react.emoji.name === emojiX){
        await react.message.reactions.cache.get(emojiCheck).users.remove(member.id);
        // splice that user from p
        for (let i = 0; i < p.length; i++) {
          if (
            p[i].id === member.id
          ) {
            p.splice(i,1)
          }
        }
      }
    }

    // take taggedMembers and p and afk then do r 
    const users = p.concat(afk);

    r = pollData.taggedMembers.filter((taggedMember) => {
      return users.filter((user) => {
        return user.id === taggedMember;
      }).length ==0
    })

    // update embed message
    const fields = generateFields(
      pollData.end, 
      pollData.leftTime, 
      p, r, afk
    );

    const generateNewEmbeds = (emb, fields) => {
      let embeds = {
        type: emb.type,
        title: emb.title,
        description: emb.description,
        color: emb.color,
        image: emb.image,
        author: emb.author,
        footer: emb.footer,
        fields: fields,
      };
      return embeds;
    };
    
    await react.message.fetch(pollData.embed_id)
    .then( message => {
      message.edit({ embeds : [generateNewEmbeds(message.embeds[0].data, fields)]})
    })
  }
}
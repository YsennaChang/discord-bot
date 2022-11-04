const {roleToAddId} = require('../utils/variables.js');
const {generateFields} = require('../utils/fields.js')
const {emojiCheck, emojiX} = require('../utils/emojis.js');

module.exports = {
  name : "remove",
  async execute( react, user, pollData, membersWithRoleToTag) {

    const member = react.message.guild.members.cache.find(member => member.id === user.id)

    if (react.emoji.name === emojiCheck) {
      // remove roleToAdd from reactedmember
      member.roles.remove(roleToAddId);
    }

    // Populate p
    const pReact = await react.message.reactions.cache.get(emojiCheck);
    const checkMembers = await pReact.users.fetch();
    const p = checkMembers.filter(member => !member.bot);

    // populate afk
    const xReact = await react.message.reactions.cache.get(emojiX);
    const xMembers = await xReact.users.fetch();
    const afk = xMembers.filter(member => !member.bot);

    // take taggedMembers and p and afk then do r 
    const users = p.concat(afk);

    const r = membersWithRoleToTag.filter((taggedMember) => {
      return !users.some( user => user.id === taggedMember.id);
    })


    // update embed message
    const fields = generateFields(
      pollData.end, 
      pollData.leftTime, 
      p, r, afk);

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
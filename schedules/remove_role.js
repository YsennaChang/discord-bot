const {roleToAddId} = require('../utils/variables.js');
const {emojiCheck} = require('../utils/emojis.js');

/* ----------- Sleep Function ----------- */

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

module.exports = {
  name : "remove_role",
  async execute (membersWithRoleToAdd, msg){

    //Populate p
    const pReact = msg.reactions.cache.get(emojiCheck);
    const checkMembers = await pReact.users.fetch();
    p = checkMembers.filter(member => !member.bot);
    for (let member of membersWithRoleToAdd) {
      if (!p.some(participant => participant.id === member.id)) {
        try {
          await member._roles.remove(roleToAddId);
          console.log("successfull removed role  from " + member.nickname);
          await sleep(1000);
        } catch (e) {
          console.log(e); // Logging error
          continue; // Continue looping
        }
      }
    }
  }
}
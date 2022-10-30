
const {roleToAddId, salonResa, botColor} = require('../utils/variables.js')
const {emojiCheck} = require('../utils/emojis.js');

module.exports= {
  name : "derby_start",
  async execute(channel){
    const embed = {
      type : "rich",
      title : `Le Derby a commencé 🐎 `,
      description : `Au cours de ce derby, il vous est possible de réserver une tâche pour une durée de ❗️1h MAXIMUM❗️ (sauf autorisation d’un chef)
      **CONDITIONS:** 
           • UNE tâche réservée à la fois svp
           • Prévenir sur le channel <#${salonResa}> et identifier le <@&${roleToAddId}> 
           • Votre réservation est validée à partir du moment où celle-ci est épinglé par un chef dans le chat Hay Day
      **Rappel des règles :**
       • Tâches à 320 uniquement 
       • OBLIGATION d'effectuer la moitié des tâches. (Le max étant l'idéal) 
       • Veuillez bien lire les messages épinglés dans le chat Hay Day et respecter les consignes ou les reservations de tâche.
           
      Trève de blabla, place à l'action. Très bon derby à tous!
      
      Sélectionner « ✅ » si lu.`,
      color : botColor
    }
    const derbyStartEmbed = await channel.send({content : `||<@&${roleToAddId}>||`, embeds : [embed]})
    
    //Add Reaction
    derbyStartEmbed.react(emojiCheck);
  }
}
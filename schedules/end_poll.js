const {roleToAddId, roleChefs, botColor} = require('../utils/variables.js');

module.exports = {
  name : "end_poll",
  async execute(channel) {
    const embed = {
      type : "rich",
      title : `Fin d'inscription au derby`,
      description : `Le derby est sur le point de commencer. L'inscription à l'évenement est clôturée via le sondage. Si vous avez oublié de vous inscrire via le sondage merci de contacter <@&${roleChefs}> pour maintenir votre participation au derby et obtenir manuellement le rôle <@&${roleToAddId}> sur le discord. Vos chefs procèdent actuellement à la mise à jour des status in game. 
      Note pour les Chef : Bella Ciao et Chantal n'ont pas Discord.  `,
      color : botColor
    }

    await channel.send({content : `||<@&${roleToAddId}>||`, embeds : [embed]})

  }
}
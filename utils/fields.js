const {
    emojiCalendrier,
    emojiHour,
    emojiTeam,
    emojiLeftTime,
    emojiAbsence
  } = require('./emojis.js');

// Global variables



// Compteur de membres ayant réagis à coche

// Liste des membres ayant réagis à coche

// Créer les champs de l'embed

const field = (name, value, inline) => {
    return {
      name: name,
      value: value,
      inline: inline,
    };
  };
  
// liste des "N'ont pas encore répondu :"
const displayNotReactedTeamMembers = (remainNotReactedTeamMembersArray) => {
  let content = '';
  if (remainNotReactedTeamMembersArray.length !== 0) {
    for (let i = 0; i < remainNotReactedTeamMembersArray.length; i++) {
      content += `<@!${remainNotReactedTeamMembersArray[i]}> `;
    }
  } else if (remainNotReactedTeamMembersArray.length === 0) {
    content = `Tout le monde a répondu à l'appel :v: `;
  }
  return content;
}

// Nombre de participants
const displayNumberOfParticipant = (participantsObject) => {
 let phrase = '';
  if (participantsObject.size === 1) {
    phrase = ' est attendu';
  } else {
    phrase = ' sont attendus';
  }
  let content = emojiTeam + ' ' + participantsObject.size + phrase;
  return content;
}

// Nom des participants
const displayNickNameOfParticpants =(participantsObject) => {
    if(participantsObject.size>0){
        let content = '';
        for (const participant of participantsObject) {
          content += `> <@!${participant[0]}>\n`
        }
        return content
    } else {
        return '_ _'
    }
}

// Membre Absent
const displayNickNameOfAfk = (afkMemberObject) => {
  if(afkMemberObject.size>0){
      let content = '';
      for (const afkMember of afkMemberObject) {
        content += `<@!${afkMember[0]}>`
      }
      return content
  } else {
      return '_ _'
  }
}

module.exports.generateFields = (end, leftTime, participantsObject, remainNotReactedTeamMembersArray, afkMemberObject) => {
    const dateField = field(
        `${emojiCalendrier} Début du derby`,
        `${emojiCalendrier} <t:${end}:F>`,
        true
    );
    
    const leftTimeField = field(
        `${emojiLeftTime}Clôture des inscriptions`,
        `${emojiHour} <t:${leftTime}:R>`,
        true
    );
    const memberRemainField = field(
        `N'ont pas encore répondu à l'appel :`,
        `${displayNotReactedTeamMembers(remainNotReactedTeamMembersArray)}`,
        false
    );

    const participatedMembersField = field(
        displayNumberOfParticipant(participantsObject),
        displayNickNameOfParticpants(participantsObject),
        false
    )
    
    const afkMembersField = field(
        `${emojiAbsence} membres indisponibles`,
        displayNickNameOfAfk(afkMemberObject),
        false
    )
    let allFields = [];
    allFields.push(
        dateField,
        leftTimeField,
        memberRemainField,
        participatedMembersField,
        afkMembersField
    )
    
    return allFields;
};
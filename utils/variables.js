exports.key = 'poll';

// Messages récurrents UTC 00 (server time)
exports.derbyPollTime = "15 18 * * SUN"; // Dim 18h Paris
exports.removeRoleTime = "00 9 * * MON"; // Lun 10h Paris
exports.enPollTime = "30 08 * * TUE"; // MAR 9h30 Paris
exports.derbyStartTime = "00 9 * * TUE"; // Mar 10h Paris

// variables serveur
exports.timeBetweenPollDerby = (24+16)*60*60; // délais entre le sondage et début derby.
exports.delay = 30*60; //30 min avant début du derby

// exports.guildId = "612095258578255893"; // Bonsaï
// exports.channelId = "612095259018526749"; // SERIOUS TALK
// exports.salonResa = "964829926786203708"; // Auberge

exports.guildId = "956319785434619944"; //Potes à la compote
exports.channelId = "957570108094545941"; //🔉-𝐀𝐧𝐧𝐨𝐧𝐜𝐞𝐬-𝐃𝐞𝐫𝐛𝐲𝐬-🔉
exports.salonResa = "1024949759049469984"; // Salon Résa Taches

//personalisation embed
exports.botColor = 0x0adfff; //format hexadécimal
exports.banniereURL = "https://cdn.discordapp.com/attachments/612095259018526749/1023527644106604624/Derby_banniere.JPG";

//roles
exports.roleToTagId = "785075888266018848";  //admin
exports.roleToAddId = "925158591936200764";  //role test
exports.roleChefs = "925427624656908350";// easyPlan

// exports.roleToTagId = "957571183514120252";  //Les potes à la compotes
// exports.roleToAddId = "977223191967715408";  //Derby
// exports.roleChefs = "962641465069170719";// les chefs
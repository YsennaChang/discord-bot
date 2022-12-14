const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {

    data : new SlashCommandBuilder()
        .setName("mine")
        .setDescription("Calcule si tu as assez d'outils pour une tâche mine")
        .addIntegerOption(option =>
            option.setName('tache')
                .setDescription(`Nombre de minerais à extraire ? (La tâche 320 demande 99 minerais)`)
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('dynamite')
                .setDescription('Combien de dynamite as-tu ?')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('tnt')
                .setDescription('Combien de baryl de TnT as-tu ?')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('pelle')
                .setDescription('Combien de pelle as-tu ?')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('pioche')
                .setDescription('Combien de pioche as-tu ?')
                .setRequired(true)),

    async execute(interaction) {
        const tache = interaction.options.data[0].value;
        const dynamite = interaction.options.data[1].value;
        const tnt = interaction.options.data[2].value;
        const pelle = interaction.options.data[3].value;
        const pioche = interaction.options.data[4].value;
        let sum = dynamite*2 + tnt*3 + pelle*4 +pioche*5;
        let result = tache-sum;
        let piocheR = result/5; // nombre d'outil restant à aquérir
        let piocheM = result % 5; //modulo
        let pelleR = piocheM / 4;
        let pelleM = piocheM % 4;
        let tntR = pelleM / 3;
        let tntM = pelleM % 3;
        let dynamiteR = tntM>0 ? 1 : 0;

        let content = `__**As tu assez d'outils pour une tâche minerais ?**__
        > Tu vises une tâche à **${tache}** minerais.
        > Avec **${dynamite}x** <:Dynamite:1022880423405162547> , **${tnt}x** <:Baril_de_TNT:1022880460273098852>, **${pelle}x** <:Pelle:1022880491294162974>, **${pioche}x** <:Pioche:1022880505793888356>, tu peux extraire **${sum}** minerais.` ;
        if (result >= 0) {
        content += `\n> Il te manquera encore **${result}** minerais pour finir la tâche.
        > Suggestions de besoin : **${Math.floor(dynamiteR)}x** <:Dynamite:1022880423405162547>, **${Math.floor(tntR)}x** <:Baril_de_TNT:1022880460273098852>, **${Math.floor(pelleR)}x** <:Pelle:1022880491294162974>, **${Math.floor(piocheR)}x** <:Pioche:1022880505793888356>
        > ||***Info** : <:Dynamite:1022880423405162547>+2, <:Baril_de_TNT:1022880460273098852>+3, <:Pelle:1022880491294162974>+4, <:Pioche:1022880505793888356>+5*||`
        } else {
            content += `\n> Tu as assez d\'outil pour réaliser la tâche mine visée.👍`
        }

        await interaction.reply(content);
    },
};
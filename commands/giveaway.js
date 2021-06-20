const ms = require('ms')

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${message.author}Você não tem permissão para começar giveaways`);

    let channel = message.mentions.channels.first();

    if (!channel) return message.channel.send(`${message.author} Forneça um canal 💬`);

    let giveawayDuration = args[1];

    if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send(`${message.author} Por favor, forneça uma duração válida ⏲️`);

    let giveawayWinners = args[2];

    if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send('Forneça um número válido de vencedores! 🧑‍🦱');

    let giveawayPrize = args.slice(3).join(" ");

    if (!giveawayPrize) return message.channel.send('O giveaway necessita de um nome! 🧐');

    client.giveawaysManager.start(channel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayWinners,
        hostedBy: client.config.hostedBy ? message.author : null,

        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY",
            giveawayEned: (client.config.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY ACABOU",
            timeRemaining: "Duração do giveaway: **{duration}**",
            inviteToParticipate: "Reage 🎉para participares",
            winMessage: "Parabéns {winners}, ganhaste **{prize}**",
            embedFooter: "Tempo de giveaway!",
            noWinner: "Não foi possível determinar um vencedor",
            hostedBy: "Hosted by {user}",
            winners: "winner(s)",
            endedAt: "Termina em",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    })

    message.channel.send(`Giveaway começando em ${channel}`);
}
  


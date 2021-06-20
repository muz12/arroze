const ms = require ("ms")
const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Não tens permissão para fazer reroll")

    if(!args[0]) return message.channel.send("Nenhum id de giveaway fornecido")

    let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageId === args[0])

    if(!giveaway) return message.channel.send("Não foi possivel encontrar a pessoa com esse id/nome")

    client.giveawaysManager.reroll(giveaway.messageId)
    .then(() => {
        message.channel.send("Giveaway relançado")
    })
    .catch((e) => {
        if(e.startsWith(`O giveaway com Id ${giveaway.messageId} não acabou`)){
            message.channel.send("O giveaway ainda não terminou")
        } else {
            console.error(e)
            message.channel.send("Ocorreu um erro")
        }
    })
}
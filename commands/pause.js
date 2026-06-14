const Discord = require("discord.js")
const { getQueue } = require("./utils/musicQueue")

module.exports.run = async (client, message, args) => {
    const queue = getQueue(message.guild.id)

    if (!queue || !queue.dispatcher)
        return message.reply("🚨 Não estou a tocar nenhuma música neste servidor!")

    if (queue.dispatcher.paused)
        return message.reply("🚨 A música já está pausada! Usa `!resume` para continuar.")

    queue.dispatcher.pause(true)

    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("⏸️ Música pausada! Usa `!resume` para continuar.")

    message.channel.send(embed)
}

const Discord = require("discord.js")
const { getQueue } = require("./utils/musicQueue")

module.exports.run = async (client, message, args) => {
    const queue = getQueue(message.guild.id)

    if (!queue || !queue.dispatcher)
        return message.reply("🚨 Não estou a tocar nenhuma música neste servidor!")

    if (!queue.dispatcher.paused)
        return message.reply("🚨 A música não está pausada!")

    queue.dispatcher.resume()

    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("▶️ Música retomada!")

    message.channel.send(embed)
}

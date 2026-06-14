const Discord = require("discord.js")
const { getQueue } = require("./utils/musicQueue")

module.exports.run = async (client, message, args) => {
    const queue = getQueue(message.guild.id)

    if (!queue || queue.songs.length < 2)
        return message.reply("🚨 Não há músicas na fila para remover!")

    const pos = parseInt(args[0], 10)

    if (!pos || pos < 2 || pos > queue.songs.length)
        return message.reply(`🚨 Escolhe um número entre **2** e **${queue.songs.length}** (vê a fila com \`!queue\`)!`)

    const removed = queue.songs.splice(pos - 1, 1)[0]

    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`🗑️ Removido da fila: **${removed.title}**`)

    message.channel.send(embed)
}

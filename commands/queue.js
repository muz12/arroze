const Discord = require("discord.js")
const { getQueue } = require("./utils/musicQueue")

module.exports.run = async (client, message, args) => {
    const queue = getQueue(message.guild.id)

    if (!queue || queue.songs.length === 0)
        return message.reply("🚨 Não há nenhuma música na fila neste servidor!")

    const description = queue.songs
        .map((song, i) => {
            if (i === 0) return `🎵 **A tocar agora:** ${song.title}`
            return `**${i + 1}.** ${song.title} — pedido por ${song.requestedBy}`
        })
        .join("\n")

    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("🎶 Fila de música")
        .setDescription(description)
        .setFooter(`${queue.songs.length} música(s) na fila${queue.loop ? " • 🔁 repetição ativada" : ""}`)

    message.channel.send(embed)
}

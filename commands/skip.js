const Discord = require("discord.js")
const { getQueue } = require("./utils/musicQueue")

module.exports.run = async (client, message, args) => {
    const queue = getQueue(message.guild.id)

    if (!queue || !queue.dispatcher)
        return message.reply("🚨 Não estou a tocar nenhuma música neste servidor!")

    if (!message.member.voice.channel || message.member.voice.channel.id !== queue.voiceChannel.id)
        return message.reply("🚨 Tens de estar no mesmo canal de voz que eu!")

    const skipped = queue.songs[0]

    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`⏭️ Música saltada: **${skipped.title}**`)

    message.channel.send(embed)

    // Terminar o dispatcher despoleta o evento "finish" no comando !play,
    // que automaticamente avança para a próxima música da fila.
    queue.dispatcher.end()
}

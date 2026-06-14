const Discord = require("discord.js")
const { getQueue, deleteQueue } = require("./utils/musicQueue")

module.exports.run = async (client, message, args) => {
    const queue = getQueue(message.guild.id)

    if (!queue)
        return message.reply("🚨 Não estou a tocar nenhuma música neste servidor!")

    if (!message.member.voice.channel || message.member.voice.channel.id !== queue.voiceChannel.id)
        return message.reply("🚨 Tens de estar no mesmo canal de voz que eu!")

    // Apagar a fila primeiro para que qualquer evento "finish" que ainda
    // dispare não tente tocar a próxima música.
    deleteQueue(message.guild.id)

    try {
        if (queue.connection) queue.connection.disconnect()
    } catch (err) {
        console.error("Erro ao sair do canal de voz: " + err)
    }

    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("⏹️ Música parada e fila limpa!")

    message.channel.send(embed)
}

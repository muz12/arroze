const Discord = require("discord.js")
const { getQueue } = require("./utils/musicQueue")

module.exports.run = async (client, message, args) => {
    const queue = getQueue(message.guild.id)

    if (!queue)
        return message.reply("🚨 Não estou a tocar nenhuma música neste servidor!")

    queue.loop = !queue.loop

    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(queue.loop
            ? "🔁 Repetição da música atual **ativada**!"
            : "▶️ Repetição da música atual **desativada**!")

    message.channel.send(embed)
}

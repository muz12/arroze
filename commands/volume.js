const Discord = require("discord.js")
const { getQueue } = require("./utils/musicQueue")

module.exports.run = async (client, message, args) => {
    const queue = getQueue(message.guild.id)

    if (!queue || !queue.dispatcher)
        return message.reply("🚨 Não estou a tocar nenhuma música neste servidor!")

    if (!args[0])
        return message.reply(`🚨 O volume atual é **${queue.volume}%**. Usa \`!volume [0-100]\` para alterar.`)

    const vol = parseInt(args[0], 10)

    if (isNaN(vol) || vol < 0 || vol > 100)
        return message.reply("🚨 Escolhe um volume entre **0** e **100**!")

    queue.volume = vol
    queue.dispatcher.setVolumeLogarithmic(vol / 100)

    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`🔊 Volume definido para **${vol}%**`)

    message.channel.send(embed)
}

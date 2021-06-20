const db = require ("quick.db")
const discord = require ("discord.js")

module.exports.run = async (client, message , args) => {
    let items = await db.fetch(message.author.id)
    if(items === null) items = "Não tem nada no inventário"

    const embed = new discord.MessageEmbed()
    .addField('Inventário', items)

    message.channel.send(embed)
}
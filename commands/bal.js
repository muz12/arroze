const db = require ("quick.db")
const discord = require ("discord.js")

module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author

    let bal = await db.fetch (`money_${message.guild.id}_${user.id}`)
    if(bal === null) bal=0
    
    const embed = new discord.MessageEmbed()
.setTitle('`Coins atualmente`')
.setColor('RAMDOM')
.setDescription(`${user} neste momento tem **${bal}** coins <:coins:832716297225502751>`)
.setFooter(`• Pedido por: ${message.author.username}`, message.author.displayAvatarURL({format: "png"}))
.setTimestamp()

message.channel.send(embed)
}


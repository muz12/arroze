const discord = require("discord.js")
const db = require ("quick.db")
const { MessageFlags, DiscordAPIError } = require("discord.js")
const parse = require ("./convertMilliseconds")

module.exports.run = async (client, message, args) => {
    let user = message.author
    let timeout = 86400000
    let amount = Math.floor(Math.random() * 1500 + 500) 

    let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`)
    if(daily !== null && timeout - (Date.now() - daily) > 0 ){
        let time = parse(timeout - (Date.now() - daily))
        return message.channel.send(`Já coletou a sua recompensa de hoje voltem em ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`)
    } else {
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`daily_${message.guild.id}_${user.id}`, Date.now())

        const embed = new discord.MessageEmbed()
.setTitle('`Daily`')
.setDescription(`<:imagemdousuariocomfundopreto:832716073726902322>${message.author} Coletou a recompensa com sucesso e recebeu **${amount}<:coins:832716297225502751>** coins`)
.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}))

message.channel.send(embed)
    }
}
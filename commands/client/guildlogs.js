const { MessageEmbed } = require ("discord.js")
const client = require ('../../index')
const logsChannel = '843125626747093063'

client.on('guildCreate', (guild) => {
    client.channels.cache.get(logsChannel).send(
        new MessageEmbed()
        .setTitle('Novo Server!')
        .addField('Guild Info',`${guild.name} (${guild.id}) **${guild.memberCount}**`)
        .addField('Dono Info', `${guild.owner} (${guild.owner.id})`)
        .setFooter(`Atualmente em ${client.guilds.cache.size} guilds!`)
        .setTimestamp()
        .setThumbnail(guild.iconURL({dynamic: true }))
        .setColor('RAMDOM')
    )
})

client.on('guildDelete', (guild) => {
    client.channels.cache.get(logsChannel).send(
        new MessageEmbed()
        .setTitle('Removido do servidor Server!')
        .addField('Guild Info',`${guild.name} (${guild.id}) **${guild.memberCount}**`)
        .addField('Dono Info', `${guild.owner} (${guild.owner.id})`)
        .setFooter(`Atualmente em ${client.guilds.cache.size} guilds!`)
        .setTimestamp()
        .setThumbnail(guild.iconURL({dynamic: true }))
        .setColor('RAMDOM')
    )
})
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) {
        return message.reply('você não tem permissão para utilizar esse comando!\nPermissões exigidas: MANAGE_CHANNELS')
    }
    
    const embedunlock = new Discord.MessageEmbed()
    .setTitle('🔓 Unlock/Desbloquear Canal')
    .setDescription('Canal desbloqueado com sucesso!')
    .setColor('GREEN')
    .setTimestamp()
    .setFooter('Canal desbloqueado com sucesso!', message.author.displayAvatarURL({ dynamic: true }))

    try {
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == '@everyone'), {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
        })
    }catch(e){
        message.channel.send(e)
    }
    message.channel.send(embedunlock)
}
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) {
        return message.reply('você não tem permissão para utilizar esse comando!\nPermissões exigidas: MANAGE_CHANNELS')
    }
    
    const embedlock = new Discord.MessageEmbed()
    .setTitle('🔒 Lock/Bloquear Canal')
    .setDescription('Canal bloqueado com sucesso!')
    .setColor('RED')
    .setTimestamp()
    .setFooter('Canal bloqueado com sucesso!', message.author.displayAvatarURL({ dynamic: true }))

    try {
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == '@everyone'), {
            SEND_MESSAGES: false, 
            ADD_REACTIONS: false
        })
    }catch(e){
        message.channel.send(e)
    }
    message.channel.send(embedlock)
}
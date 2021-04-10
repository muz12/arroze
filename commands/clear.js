const Discord = require ("discord.js")


exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES"))  //bloqueador de mensagens
    return message.reply("🚨 Você não tem permissaão para limpar o chat!")
    const deleteCount = parseInt(args[0], 10) //vai pegar o 1 argumento que a passo mandou para base de 10
    if (!deleteCount || deleteCount <1 || deleteCount >100) //caso nao tenha definido o numero de mensagens excluidas entre 1 e 100
    return message.reply(" 🚨 Tem de escolher um número válido de **1** a **100** mensagens!")

    const fetched = await message.channel.messages.fetch({ limit: deleteCount  + 1}) //Para pesquisar o numero de mensagens que escreveu e somar mais 1 para apagar a mensagem que a pessoa digitou
    message.channel.bulkDelete(fetched); { //para o bot apagar as mensagens
        let embed = new Discord.MessageEmbed()
        .setDescription(`**♻️Foram apagadas ${args[0]} mensagens neste chat**`)
        .setColor('Green')
        .setTitle('`Limpo`')
        .setFooter(`• Limpo por:${message.author.username}`, message.author.displayAvatarURL({format: "png"}))
        .setTimestamp()
        await message.channel.send(embed)
    }
    
    
}


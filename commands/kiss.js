const Discord = require ('discord.js');



module.exports.run = async (client, message, args) => {
    var list = [
        'https://i.imgur.com/wQjUdnZ.gif',
        'https://i.imgur.com/sGVgr74.gif' 
    ];

    var rand  = list[Math.floor(Math.random() * list.length)] //para buscar uma imagem aleatória no array
    let user = message.mentions.users.first() || client.users.cache.get(agrs[0]) //caso nao exista o usuario
    if (!user) { 
        return message.reply('Mencione um usuário válido para beijar!') 
    }

    //message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files:[rand]})//serve para dizer que o autor beijou o usuario que foi mencionada

    let avatar = message.author.displayAvatarURL({format: "png"})
    const embed = new Discord.MessageEmbed()
        .setTitle('`😘Kiss😘`')
        .setColor('BLUE')
        .setDescription(`💖${message.author} **acaba de beijar** ${user}🥰`)
        .setImage(rand) //para puxar a variavel das imagens
        .setTimestamp()
        .setFooter(message.author.tag, avatar)
    
        await message.channel.send(embed)
}
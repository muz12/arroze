const { MessageEmbed } = require('discord.js')
const cooldowns = {}
const ms = require("ms")

module.exports.run =  async(client, message, args) => {


    let avata = message.mentions?.users.first() || client.users.cache.find(x => args[0]?.includes(x.id)) || message.author
    const embed = new MessageEmbed()
        .setColor('#9900f8')
        .setTitle(`${client.user.username} `)
        .setDescription(` Avatar de ${avata} [Clique aqui para baixar!](${avata.avatarURL({dynamic: true, size: 4096, format: 'png'})})`)
        .setImage(avata.displayAvatarURL({dynamic: true, size: 4096, format: 'png'}))
        .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        message.channel.send(embed)  
    }
        

        
    

   

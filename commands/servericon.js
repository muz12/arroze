const { MessageEmbed } = require('discord.js')

    module.exports.run =  async(client, message, args) => {
        let avata = client.guilds.cache.get(args[0]) || message.guild
        const embed = new MessageEmbed()
            .setColor('#9900f8')
            .setTitle(`${client.user.username}`)
            .setDescription(` Icone do ${avata.name} [Clique aqui para baixar!](${avata.iconURL({dynamic: true, size: 4096, format: 'png'})})`)
            .setImage(avata.iconURL({dynamic: true, size: 4096, format: 'png'}))
        message.channel.send(embed)
      
    }

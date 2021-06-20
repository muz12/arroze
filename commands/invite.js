const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const embed1 = new Discord.MessageEmbed()
    .setTitle(`🍬 | **Convite**`)
    .setColor('RAMDOM')
    .setDescription(`Clique [aqui]( https://discord.com/oauth2/authorize?client_id=827118058425417729&scope=bot&permissions=8) para me convidar para o seu servidor! `)
    .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
    const msg = await message.channel.send(embed1);
}
const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-br');
module.exports.run =  async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
            .setTitle('📅 | CALENDÁRIO')
            .setColor('RANDOM')
            .addField('Data de Hoje:', `${moment().format('L')}, ou seja, ${moment().format('LL')}`)
            .addField('Dia da Semana:', `${moment().format('dddd')}`)
            .addField('Horário:', `${moment().format('LT')}`)
            .addField('Data de 10 dias atrás:', `${moment().subtract(10, 'days').calendar()}, ou seja, ${moment().subtract(10, 'days').format('LL')}`)
            .addField('Daqui a 10 dias:', `${moment().add(10, 'days').calendar()}, ou seja, ${moment().add(10, 'days').format('LL')}`)
            .setFooter(`Pedido por: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setThumbnail('https://media.discordapp.net/attachments/734811652314234978/738195660687409162/3078971.png?width=434&height=434');
        message.channel.send(embed);

}
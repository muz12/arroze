const Guild = require ("./database/Schemas/Guild")
module.exports.run = async (client, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    message.channel.send({
        embed: {
            color: 'RAMDOM',
            author: { name: 'Arroze - Help🛠️' },
            footer:{ text: 'Desenvolvedor Gomezzz#9093' },
            fields: [
                { name: 'Giveaway', value:`Para fazer um giveaway basta digitar: **${server.prefix}giveaway** "Canal" "Tempo" "Vencedores" "Nome do giveaway"\n\n Exemplo de tempo: 1s(1 segundo), 1m(1 minuto), 1h(1 hora). Para determinar um vencedor tem de ter pelo menos 10 pessoas entradas no giveaway`},
                
            ],
            timestamp: new Date(),
          

        },
    });
}
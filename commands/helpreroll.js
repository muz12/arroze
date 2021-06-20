const Guild = require ("./database/Schemas/Guild")
module.exports.run = async (client, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    message.channel.send({
        embed: {
            color: 'RAMDOM',
            author: { name: 'Arroze - Help🛠️' },
            footer:{ text: 'Desenvolvedor Gomezzz#9093' },
            fields: [
                { name: 'Reroll', value:`Caso queira determinar outro vencedor terá de pegar no id do giveaway e fazer o seguinte: **${server.prefix}reroll "ID DO GIVEAWAY"**`},
                
            ],
            timestamp: new Date(),
          

        },
    });
}
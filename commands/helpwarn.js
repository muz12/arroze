const Guild = require ("./database/Schemas/Guild")
module.exports.run = async (client, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    message.channel.send({
        embed: {
            color: 'RAMDOM',
            author: { name: 'Arroze - Help🛠️' },
            footer:{ text: 'Desenvolvedor Gomezzz#9093' },
            fields: [
                { name: 'Warn', value:`Para avisar uma pessoa no seu privado digite **${server.prefix}warn** @ da pessoa e o motivo.`},
                
            ],
            timestamp: new Date(),
          

        },
    });
}
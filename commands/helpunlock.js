const Guild = require ("./database/Schemas/Guild")
module.exports.run = async (client, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    message.channel.send({
        embed: {
            color: 'RAMDOM',
            author: { name: 'Arroze - Help🛠️' },
            footer:{ text: 'Desenvolvedor Gomezzz#9093' },
            fields: [
                { name: 'unlock', value:`Para as pessoas voltarem a falar no canal digite no canal que esta lock **${server.prefix}unlock**.`},
                
            ],
            timestamp: new Date(),
          

        },
    });
}
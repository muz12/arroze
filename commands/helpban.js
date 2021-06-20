const Guild = require ("./database/Schemas/Guild")
module.exports.run = async (client, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    message.channel.send({
        embed: {
            color: 'RAMDOM',
            author: { name: 'Arroze - Help🛠️' },
            footer:{ text: 'Desenvolvedor Gomezzz#9093' },
            fields: [
                { name: 'Ban', value:`Para banir uma pessoa basta digitar: **${server.prefix}ban** "Nome da pessoa" e pode por a razão`},
                
            ],
            timestamp: new Date(),
          

        },
    });
}
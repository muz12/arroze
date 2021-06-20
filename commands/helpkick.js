const Guild = require ("./database/Schemas/Guild")
module.exports.run = async (client, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    message.channel.send({
        embed: {
            color: 'RAMDOM',
            author: { name: 'Arroze - Help🛠️' },
            footer:{ text: 'Desenvolvedor Gomezzz#9093' },
            fields: [
                { name: 'Kick', value:`Para kickar uma pessoa do seu servidor use **${server.prefix}kick** "Nome da pessoa" e pode meter a razão.`},
                
            ],
            timestamp: new Date(),
          

        },
    });
}
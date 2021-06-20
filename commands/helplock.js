const Guild = require ("./database/Schemas/Guild")
module.exports.run = async (client, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    message.channel.send({
        embed: {
            color: 'RAMDOM',
            author: { name: 'Arroze - Help🛠️' },
            footer:{ text: 'Desenvolvedor Gomezzz#9093' },
            fields: [
                { name: 'Lock', value:`Se quiser que as pessoas nao mandem mensagem num canal especifico basta digitar no canal **${server.prefix}lock**.`},
                
            ],
            timestamp: new Date(),
          

        },
    });
}
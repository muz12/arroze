const Guild = require ("./database/Schemas/Guild")
module.exports.run = async (client, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    message.channel.send({
        embed: {
            color: 'RAMDOM',
            author: { name: 'Arroze - Help🛠️' },
            footer:{ text: 'Desenvolvedor Gomezzz#9093' },
            fields: [
                { name: 'Byebye', value:`Para ativar o sitema de byebye basta usar **${server.prefix}byebye on/off** para ligar e desligar o sistema\n\n Para setar o canal de byebye basta usar **${server.prefix}byebye canal (nome do canal)**\n\n Agora tem aqui um exemplo de mensagem de welcome:  {member}  saiu do servidor **{guildName}** agora temos **{total}** membros.`},
                
            ],
            timestamp: new Date(),
          

        },
    });
}
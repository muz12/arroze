const Guild = require ("./database/Schemas/Guild")
module.exports.run = async (client, message, args) => {
    const server = await Guild.findOne({ id: message.guild.id })
    message.channel.send({
        embed: {
            color: 'RAMDOM',
            author: { name: 'Arroze - Help🛠️' },
            footer:{ text: 'Desenvolvedor Gomezzz#9093' },
            fields: [
                { name: 'Welcome', value:`Para ativar o sitema de welcome basta usar **${server.prefix}welcome on/off** para ligar e desligar o sistema\n\n Para setar o canal de welcome basta usar **${server.prefix}welcome canal (nome do canal)**\n\n Agora tem aqui um exemplo de mensagem de welcome: {member}/ **{name}**  entrou no servidor **{guildName}** agora temos **{total}** membros.`},
                
            ],
            timestamp: new Date(),
          

        },
    });
}
const Guild = require ('./database/Schemas/Guild')
const logger = require ('./utils/logger')

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${message.author}, você precisa da permissão  para executar este comando.`)
        Guild.findOne({ id: message.guild.id }, async function(err, server){
            if(err) return console.log(err);

            let prefixos = args[0]
            console.log(server)
            if(!prefixos) {
                return message.channel.send(`${message.author} <:errado:830463944216281129> Você não inseriu nenhum prefixo para eu alterar!`)
            } else if(prefixos.length > 5 ) {
                return message.channel.send(`${message.author} 🚫 Você deve inserir um prefixo até 5 palavras!`)
            } else if(prefixos == server.prefix) {
                return message.channel.send(`${message.author} 🤷‍♂️ Não foi possivel alterar o prefixo por ser igual ao do servidor!`)
            } else {
             message.channel.send(`${message.author} <:listadecontrole:830463944283652127> O prefixo do servidor foi alterado para **${prefixos}** com sucesso!`)
                server.prefix = prefixos;
                await server.save()
            }
        })
}
const Guild = require ('../commands/database/Schemas/Guild')
const logger = require ('../commands/utils/logger')

module.exports.run = async (client, message, args) => {

        Guild.findOne({_ids: message.guild.id}, async function(err, server){

            let prefixos = args[0]
            console.log(server)
            if(!prefixos) {
                return message.channel.send(`${message.author} Você não inseriu nenhum prefixo para eu alterar!`)
            } else if(prefixos.length > 5 ) {
                return message.channel.send(`${message.author}Você deve inserir um prefixo até 5 palavras!`)
            } else if(prefixos == server.prefix) {
                return message.channel.send(`${message.author}Não foi possivel alterar o prefixo por ser igual ao do servidor!`)
            } else {
             message.channel.send(`${message.author} O prefixo do servidor foi alterado para ${prefixos} com sucesso!`)

                await Guild.findOneAndupdate({_ids: message.guild.id}, {$set: {prefix:prefixo }})
            }
        })
}
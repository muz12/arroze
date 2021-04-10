const Discord = require ('discord.js');



module.exports.run = async (client, message, args) => {
    const sayMessage = args.join(" "); //vai pegar a mensagem que colocamos antes do comando
    message.delete().catch(O_o => {});    //o bot deletar a mensagem do comando  e casso dê algum erro ignora esse erro
    message.channel.send(sayMessage); //vai enviar a mensagem no chat 
} 
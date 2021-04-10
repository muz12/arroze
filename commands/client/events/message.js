const guild = require ('../../database/Schemas/Guild')
const User = require ('../../database/Schemas/User')


const GetMention = (id) => new RegExp(`<@\!?${id}>`);

module.exports = async ( message) => {
    try {
        Guild.findOne({_id: message.guild.id }, async function(err, server) {
        User.findOne({_id: message.author.id }, async function(err, user) {

        if (message.author.bot == true) return;

            if(server){
            if(user){
        var prefix;
        prefix = server.prefix

        if(message.content.match(GetMention(client.user.id))) {
            message.channel.send(
                `Olá ${message.author} o meu prefixo é **${prefix}**.`
            );
            console.log("a")
}
            if(message.content.indexOf(prefix) !== 0) return;
            let messageArray = message.content.split(" ");
            let cmd = messageArray[0]
            let args = messageArray.slice(1)
            let cmdFile =
                client.commands.get(cmd.slice(prefix.length)) || 
                client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
                
                if(cmdFile) {
                    return cmdFile.run(client, message, agrs)
                }
            } else {
                User.create({_id:message.author.id})
            }
            } else {
                Guild.create({_id: message.guild.id})
            }
        })
    })
    } catch(err) {
        if(err) console.error(err);
    }
}

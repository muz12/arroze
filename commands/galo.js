const { tictactoe } = require ("reconlx")

module.exports.run = async (client, message, args) => {
    const member = message.mentions.members.first()
        if(!member) return message.channel.send(`${message.author}Tem de escolher uma pessoa para poder jogar`)

        new tictactoe({
            player_two: member,
            message: message
        })
}
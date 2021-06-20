const User = require ("./database/Schemas/User")


module.exports.run = async (client, message, args) => {
    User.findOne({ id: message.author.id}, async function (err, user) {
        let coins = user.coins

        message.channel.send(`${message.author}, você tem atualmente **${coins.toLocaleString()}** coins.`)
    })
}

 
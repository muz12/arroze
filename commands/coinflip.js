module.exports.run = async (client, message, args) => {
    var coin = Math.floor(Math.random() * 20);
    var coin_string = '';

    if (coin % 3 === 0)
        coin_string += "**cara 😌**";
    else
        coin_string += "**coroa 👑**";

    return message.channel.send(`<@${message.author.id}> jogou a moeda e caiu em ${coin_string}`);
}
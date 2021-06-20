const db = require('quick.db');
const parse = require ("./convertMilliseconds")



    module.exports.run = async (client, message, args) => {
        let user = message.author;
        let timeout = 600000;
        let author = await db.fetch(`worked_${message.guild.id}_${user.id}`);

        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = parse(timeout - (Date.now() - author));
            return message.channel.send(`${message.author} Para trabalhar novamente tem de esperar ${time.minutes}m ${time.seconds}s`)
        } else {
            let amount = Math.floor(Math.random() * 80) + 1;
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`worked_${message.guild.id}_${user.id}`, Date.now())

            message.channel.send(`${user}, Você trabalhou e recebeu ${amount}coins <:coins:832716297225502751>`)
        }
    }
   
 
    

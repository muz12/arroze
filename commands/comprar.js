const db = require ("quick.db")
const discord = require ("discord.js")

module.exports.run = async (client, message, args) => {
    let purchase = args.join(" ")
    if(!purchase) return message.channel.send(`${message.author} Insira um item que deseja comprar`)
    let items = await db.fetch(message.author.id, {items: [ ] })
    let amount = await db.fetch (`money_${message.guild.id}_${message.author.id}`)

    if(purchase === 'carro') {
        if(amount < 500) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 500)
        db.push(message.author.id, "Carro")
         message.channel.send(`Boa! Agora você tem um carro, conduza com cuidado.`)
    }
    if(purchase === 'relógio') {
        if(amount < 200) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 200)
        db.push(message.author.id, "Relógio")
         message.channel.send(`Agora já podes ver as horas para não te atrasares.`)
    }

    if(purchase === 'Jaguar') {
        if(amount < 80000) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 80000)
        db.push(message.author.id, "🏎️Jaguar")
         message.channel.send(`Conduz com cuidado!! Carro Potente**(700HP)🏎️**.`)
    }
    if(purchase === 'Rolex') {
        if(amount < 13000) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 13000)
        db.push(message.author.id, "🕰️Rolex")
         message.channel.send(`Um relógio para quem gosta de dar flex🕰️.`)
    }
    if(purchase === 'Nike Air force') {
        if(amount < 1100) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 1100)
        db.push(message.author.id, "👟Nike Air force")
         message.channel.send(`Agora tens umas sapatilhas para não andares descalço👟.`)
    }
    if(purchase === 'Calças') {
        if(amount < 999) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 999)
        db.push(message.author.id, "👖Calças")
         message.channel.send(`Não passas frio com estas👖.`)
    }
    if(purchase === 'T-shirt Supreme') {
        if(amount < 740) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 740)
        db.push(message.author.id, "👕T-shirt Supreme")
         message.channel.send(`Para quem gosta de dar flex👕.`)
    }
    if(purchase === 'Casa Simples') {
        if(amount < 25000) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 25000)
        db.push(message.author.id, "🏠Casa Simples")
         message.channel.send(`Uma casa normal. Com cozinha, quartos, casas de banho e jardim🏠.`)
    }
    if(purchase === 'Casa Moderna') {
        if(amount < 100000) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 100000)
        db.push(message.author.id, "🏡Casa Moderna")
         message.channel.send(`Casa Moderna, com móveis modernos, 2 cozinhas, quartos, 2 casas de banho, jardim, piscina**(3,75x1,22)**🏡.`)
    }
    if(purchase === 'Casa Rico') {
        if(amount < 500000) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 500000)
        db.push(message.author.id, "🏘️Casa Rico")
         message.channel.send(`Casa Rico, com móveis de alta qualidade, várias cozinhas, vários quartos, jardins , piscina de chão**(8,00x5,00)**, sala de cinema e muito mais🏘️.`)
    }
    if(purchase === 'Iphone 12 Pro Max') {
        if(amount < 5000) return message.channel.send(`${message.author} Não tens dinheiro para comprar este item`)
        db.subtract(`money_${message.guild.id}_${message.author.id}`, 5000)
        db.push(message.author.id, "📱Iphone 12 Pro Max")
         message.channel.send(`Um ótimo telemóvel para tirares fotografias📱.`)
    }
}
const discord = require ("discord.js")
const novelcovid = require ("novelcovid")
module.exports.run = async (client, message, args) => {
    let text  = args.join(" ")
    if(!text) {
        let corona = await novelcovid.all()

        const embed = new discord.MessageEmbed()
        .setAuthor("Status covid-19 global")
        .setColor("RAMDOM")
        .addField("<:coronavirus:830797883258568724>Total de casos:", corona.cases.toLocaleString(),true)
        .addField("<:death:830798067414466610>Total de mortes:", corona.deaths.toLocaleString(), true)
        .addField("<:novirus:830800951450664971>Total recuperados:", corona.recovered.toLocaleString(), true)
        .addField("<:testresults:830801137958912010>Casos diários:", corona.todayCases.toLocaleString(), true)
        .addField("<:death1:830800281167724554>Mortes diárias:", corona.todayDeaths.toLocaleString(), true)
        .addField("😷Recuperados diários:", corona.todayRecovered.toLocaleString(), true)
        .addField("<:active:830799196520185856>Casos ativos:", corona.active.toLocaleString(), true)
        .addField("<:alert:830798526149033994>Casos críticos:", corona.critical.toLocaleString(), true)
        .addField("<:refresh:830799471653814312>Atualizações:", corona.updated.toLocaleString(), true)
        .setFooter("Fica em casa")
        .setTimestamp()

        message.channel.send(embed)
    }else {
        let corona = await novelcovid.countries({country: args.join(' ')})

        if(corona.country === undefined) return message.channel.send(`${message.author},não consigo encontrar o país chamado: **${args.join(' ')}** `)

        const embed = new discord.MessageEmbed()
        .setAuthor(`${corona.country}[${corona.countryInfo.iso2}]`, corona.countryInfo.flag)
        .setThumbnail(corona.countryInfo.flag)
        .setColor("RAMDOM")
        .addField("<:coronavirus:830797883258568724>Total de casos:", corona.cases.toLocaleString(),true)
        .addField("<:death:830798067414466610>Total de mortes:", corona.deaths.toLocaleString(), true)
        .addField("<:novirus:830800951450664971>Total recuperados:", corona.recovered.toLocaleString(), true)
        .addField("<:testresults:830801137958912010>Casos diários:", corona.todayCases.toLocaleString(), true)
        .addField("<:death1:830800281167724554>Mortes diárias:", corona.todayDeaths.toLocaleString(), true)
        .addField("😷Recuperados diários:", corona.todayRecovered.toLocaleString(), true)
        .addField("<:active:830799196520185856>Casos ativos:", corona.active.toLocaleString(), true)
        .addField("<:alert:830798526149033994>Casos críticos:", corona.critical.toLocaleString(), true)
        .addField("<:refresh:830799471653814312>Atualizações:", corona.updated.toLocaleString(), true)
        .setFooter("Fica em casa")
        .setTimestamp()

        message.channel.send(embed)
    }
}
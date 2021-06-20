const Discord = require("discord.js")

function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
        d: d
        , h: h
        , m: m
        , s: s
    };
};

module.exports.run = async (scott, message, args) => {
    
    
    let u = convertMS(scott.uptime);

    let segundo = u.s + " Seconds"
    let minuto = u.m + " Minutes"
    let hora =u.h + " Hours" 
    let dia = u.d + " Days"  



    let uptimeE = new Discord.MessageEmbed()
        
            .setThumbnail(``)
            .setColor("#36393e")
             .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .addField('⏲️ - **Uptime:**', `**${dia}\n${hora}\n${minuto}\n${segundo}**`)
            message.channel.send(uptimeE)

}
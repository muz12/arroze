const discord = require ('discord.js') //coneção com a livraria discord.js
const client = new discord.Client() //criação de um novo cliente
const config = require ("./config.json")
const message = require ("./commands/client/events/message")
const guild = require ("./commands/database/Schemas/Guild")
const db = require ("./commands/database/index")
const user = require ("./commands/database/Schemas/User")



const dbindex = require ('./commands/database/index.js')
dbindex.start()



client.on ("message", async message => {
    if(message.author.bot) return;  //vai ignorar mensagens vindas de outros bots
    if(message.channel.type === "dm") return; //vai ingorar mensagens de bots no privado
    if(!message.content.startsWith(config.prefix)) return; //vai ignorar mensagens que não começem com o prefix do bot
    if(message.content.startsWith(`<@!${client.user.id}`) || message.content.startsWith(`<@${client.user.id}`)) return;//para o bot não entender a menção ou a sitação do seu id algo válido para executar comandos

    let args = message.content.split(" ").slice(1); //vai seprar os argumentos e mostrar para o bot como ele deve separar os comandos e vai ler o 1º argumento como se fosse o 1 comando
    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    try {
        let commandFile = require (`./commands/${command}.js`); //mostar para o bot como vai fazer a leitura dos proprios comandos
        delete require.cache [require.resolve(`./commands/${command}.js`)];
        return commandFile.run(client, message, args);
    } catch (err) { //caso deia algum erro aparecer na consola
        console.error("Erro" + err);
    }
})





client.on("ready", () => {  //serve para o bot mandar uma mensagem quanto estiver pronto
    console.log("Estou Online!")
})

client.on("ready", () => {   //serve para mudar os status do bot
    let activities = [
        `Utilize ${config.prefix}help para obter ajuda`,
        ` ${client.guilds.cache.size} servidores.`,
        ` ${client.channels.cache.size} canais.`,
        `Tenho ${client.users.cache.size} usuários.`,
        `twitch.tv/arr0ze.`
    ],
i= 0
setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {  //tempo do bot 5000 = 5 segundos
    type: "WATCHING" //WATCHING LISTENING PLAYING STREAMING
}), 5000)
client.user
.setStatus("dnd") //idle , dnd , online , invisible
.catch(console.log)
})

client.login(config.token);


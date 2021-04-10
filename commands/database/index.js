const mongoose = require ("mongoose")
const logger = require ('../utils/logger')



module.exports = {
    start(){
        try {
            mongoose.connect('mongodb+srv://admin:admin@arroze.pdmqv.mongodb.net/Arroze?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            logger.sucess(`(DataBase)- Conectado ao banco de dados`)
        } catch(err) {
            if(err) logger.erro (`(DataBase) - ERRO`, +err)
        }
    }
}
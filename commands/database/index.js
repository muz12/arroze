const mongoose = require ("mongoose")
const logger = require ('../utils/logger')



module.exports = {
    start(){
        try {
            mongoose.connect(process.env.MONGO_URI, {
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

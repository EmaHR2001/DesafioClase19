const mongoose= require('mongoose')
const logger = require('../../config/logger.config');

url= 'mongodb+srv://Coder:spiderverse2099@coder.qugttqn.mongodb.net/'

class ManagerMongo {

    constructor (url){
        this.url = url
    } 

        connect(){
            return mongoose.connect(this.url+'ecommerce', {useUnifiedTopology:true, useNewUrlParser:true})
            .then(connect =>{ logger.info ('conexion exitosa')})
            .catch(err=>{logger.error(err)})
        }
    
}

module.exports=ManagerMongo
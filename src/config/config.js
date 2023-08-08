const dotenv = require('dotenv')
dotenv.config({path:'src/.env'})

module.exports = {
    port:process.env.PORT || 8080,
    mongoDb: process.env.MONGO_Db,
    mongoose: process.env-Mongoose,
    secret: process.env.SECRET,
}
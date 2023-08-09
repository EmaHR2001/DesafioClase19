const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    port:process.env.PORT || 8080,
    mongoDb: process.env.MONGO_DB,
    mongoose: process.env.MONGOOSE,
    secret: process.env.SECRET,
}
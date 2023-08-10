import dotenv from 'dotenv';
dotenv.config();

export default {
    port:process.env.PORT || 8080,
    mongoDb: process.env.MONGO_DB,
    mongoose: process.env.MONGOOSE,
    secret: process.env.SECRET,
}
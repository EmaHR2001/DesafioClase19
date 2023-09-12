const mongoose = require('mongoose')

const ResetTokenSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,

    },
    expiration_datetime: {
        type: String,
        unique: false,
        required: true,
    },
    purchaser: {
        type: String,
        unique: false,
        required: true,
    }
})

const ResetToken = mongoose.model('pass_reset_tokens', ResetTokenSchema)

module.exports = ResetToken
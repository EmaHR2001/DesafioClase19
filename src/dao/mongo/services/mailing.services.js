const nodemailer = require('nodemailer');
const logger = require('../../../config/logger.config');
const User = require("../models/users.model");
const ResetToken = require('../models/token.model')
const uuid4 = require('uuid4')
const { gmailPass, gmailUser } = require('../../../config/env.config');

class MailingService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 567,
            auth: {
                user: gmailUser,
                pass: gmailPass,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async getByToken(code) {
        const token = await ResetToken.findOne({ code: code });
        return token
    }

    async tokenCreate(email) {
        let newToken = {
            code: uuid4(),
            expiration_datetime: new Date(Date.now() + 60 * 60 * 1000),
            purchaser: email
        }
        const result = await ResetToken.create(newToken);
        return result.code;
    }

    async isTokenExpired(token) {
        const currentDate = new Date();
        const valor = token.expiration_datetime > currentDate ? false : true;
        return valor
    }

    async sendRestoreEmail(email, token) {
        const restoreEmail = {
            from: gmailUser,
            to: email,
            subject: 'Recuperación de contraseña',
            text: 'Para restablecer su contraseña ingrese a este link: http://localhost:3000/password-reset/' + token,
        };

        this.transporter.sendMail(restoreEmail, (error, info) => {
            if (error) {
                logger.error('Error al enviar el correo: ' + error);
            } else {
                logger.info('Correo enviado con éxito: ' + info.response);
            }
        });
    }
}

module.exports = MailingService;
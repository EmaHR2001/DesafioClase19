const MailingServices = require('../dao/mongo/services/mailing.services')
const MailingService = new MailingServices()
const UserServices = require('../dao/mongo/services/users.services')
const UserService = new UserServices

const passResetView = async (req, res) => {    
    res.render("passwordReset");
}

const passResetEmail = async (req, res) => {
    try {
        const email = req.body;
        const user = await UserService.getByEmail(email.email);
        let message = ""

        if (user) {
            let token = await MailingService.tokenCreate(email.email);
            MailingService.sendRestoreEmail(email.email, token);
            message = "Se le a enviado un email a su correo electrónico."
        } else {
            message = "No se a encontrado un usuario con ese correo. Intente nuevamente."
        }
        res.render("passwordReset", {message});
    }
    catch (e) {
    }
}

const tokenVerification = async (req, res) => {
    const code = req.params
    try {
        const token = await MailingService.getByToken(code.code);
        if (token && (await MailingService.isTokenExpired(token))) {
            const info = {...token}
            res.render("changePasswordForm", {info});
        } else {
            const message = "Tu solicitud no existe o expiro. Por favor intente nuevamente."
            res.render("passwordReset", {message});
        }
    }
    catch (e) {
    }
}

const updatePassword = async (req, res) => {
    const code = req.params
    const newPassword = req.body
    try {
        const token = await MailingService.getByToken(code.code);
        if (token) {
            const updateUser = await UserService.updatePassword(token.purchaser, newPassword.password)
            logger.info("Contraseña cambiada." + updateUser)
        } else {
            logger.error("Solicitud no encontrada.");
        }
    }
    catch (e) {
    }
}

const passResetViewError = (req, res) => {
    res.render("error404", {
        style: "error404.css",
        title: "Error 404",
    });
}

module.exports = {
    passResetView,
    passResetEmail,
    tokenVerification,
    updatePassword,
    passResetViewError
}
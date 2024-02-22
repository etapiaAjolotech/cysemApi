const nodemailer = require('nodemailer');

const emailRegistro = async(datos) => {
    const {userName, email, token} = datos;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "8f0a99f15a1805",
        pass: "527998ff7d40b5"
    }
});

const info = await transport.sendMail({
    from: '"Cysem - Administrador de Usuarios" <cuentas@cysem.com>',
    to: email,
    subject: 'Cysem - Comprueba tu cuenta',
    text: 'Comprueba tu cuenta',
    html: `
        <p>Hola: ${userName} comprueba tu cuenta en Cysem</p>
        <p>Tu cuenta ya esta casi lista solo debes hacer click en el enlace</p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `
});
}

module.exports = {
    emailRegistro
}
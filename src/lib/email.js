const nodemailer = require('nodemailer')
const { MAIL_USER, MAIL_PASS, MAIL_HOST, MAIL_PORT, JWT_SECRET } = process.env

let transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
})
//* Checando la conexión con mailtrap
transporter
  .verify()
  .then(() => {
    console.log('good')
  })
  .catch(error => {
    console.log(error)
  })

async function sendEmail(email, resetUrl) {
  console.log('enviar correo')
  await transporter.sendMail({
    from: '"Alux 🐰" <noreplay@alux.com>', // sender address
    to: email, // list of receivers
    subject: 'Restablecer contraseña ✔', // Subject line
    text: `Reset password  ${resetUrl}`, // plain text body
    html: `<h1>Hola ${email}</h1> 
      <p>Para restablcer tu contraseña sigue el siguiente link: <br> 
      <a href="${resetUrl}">Cambiar mi contraseña</a> <br>
      <small> Validez 1hr, si no solicitaste cambiarla simplemente ignora este correo, tu contraseña seguira intacta </small></p>`, // html body
  })
}

module.exports = { sendEmail }

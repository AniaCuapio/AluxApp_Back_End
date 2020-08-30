const nodemailer = require('nodemailer')
const { MAIL_USER, MAIL_PASS, MAIL_HOST, MAIL_PORT, JWT_SECRET } = process.env

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(
  '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'
)

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
  await sgMail.send({
    from: '"Alux 🐰" <alux.app@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Restablecer contraseña ✔', // Subject line
    text: `Reset password  ${resetUrl}`, // plain text body
    html: `<h1>Hola ${email}</h1> 
      <p>Para restablcer tu contraseña sigue el siguiente link: <br> 
      <a href="${resetUrl}">Cambiar mi contraseña</a> <br>
      <small> Validez 1hr, si no solicitaste cambiarla simplemente ignora este correo, tu contraseña seguira intacta </small></p>`, // html body
  })
}

async function sendQRReadEmail(email, coords) {
  console.log('enviar correo')
  try {
    await sgMail.send({
      from: '"Alux 🐰" <alux.app@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Información sobre tu mascota 🦄', // Subject line
      html: `<h1>Hola ${email}</h1> 
        <p>Escanearon el QR de tu mascota en: ${coords.latitude} ${coords.longitude}</p>`, // html body
    })
  } catch (error) {
    // Log friendly error
    console.error(error)

    if (error.response) {
      // Extract error msg
      const { message, code, response } = error

      // Extract response msg
      const { headers, body } = response

      console.error(body)
    }
  }
}

module.exports = { sendEmail, sendQRReadEmail }

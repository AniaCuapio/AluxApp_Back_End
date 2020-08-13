const emailConfig = require('../lib/email')
const nodemailer = require('nodemailer')
const util = require('util')
const { model } = require('../models/users')

const { host, port, user, pass } = nodemailer

let transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
})

async function sendEmail(email, resetUrl) {
  const emailOptions = {
    from: 'Alux <noreply@alux.app',
    to: email,
    subject: 'Restablecer contraseña',
    text: resetUrl,
  }
  const sendMail = util.promisify(transport.sendMail, transport)
  return sendMail.call(transport, emailOptions)
}

module.exports = { sendEmail }

const emailConfig = require('../lib/email')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const util = require('util')

const { host, port, user, pass } = emailConfig
let transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
})

async function sendEmail({ options: { email, subject, resetUrl, file } }) {
  const emailOptions = {
    from: 'Alux <noreply@alux.com',
    to: email,
    template: file,
    subject,
    context: {
      resetUrl,
    },
  }
  const sendMail = util.promisify(transport.sendMail, transport)
  return sendMail.call(transport, emailOptions)
}

module.exports = { sendEmail }

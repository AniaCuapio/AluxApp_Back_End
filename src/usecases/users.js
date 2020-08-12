const Users = require('../models/users')
const bcrypt = require('../lib/bcrypt.js')
const jwt = require('../lib/jwt')
const crypto = require('crypto')
const sendEmail = require('../handlers/email')

function getAll() {
  return Users.find()
}
function getById(userId) {
  return Users.findById(userId)
}

function create(userData) {
  return Users.create(userData)
}

function remove(userId) {
  return Users.findByIdAndDelete(userId)
}

function update(userID, newUserData) {
  return Users.findByIdAndUpdate(userID, newUserData)
}

async function signUp(userData) {
  const { password, email } = userData
  const userByEmail = await Users.findOne({ email })
  if (userByEmail) {
    throw new Error('email ya utilizado')
  }
  const encriptedPassword = await bcrypt.hash(password)
  return Users.create({
    ...userData,
    password: encriptedPassword,
  })
}

async function login(email, password) {
  const userByEmail = await Users.findOne({ email })
  if (!userByEmail) {
    throw new Error('Login error- Email')
  }
  const isValid = await bcrypt.compare(password, userByEmail.password)
  console.log(isValid, email, password, userByEmail)
  if (!isValid) {
    throw new Error('Login Error- Password')
  }
  return jwt.sign({ id: userByEmail._id })
}

//! Restablecer password

async function generateTokenReset(email) {
  const { tokenResetPassword, expiraResetPassword } = Users
  console.log(tokenResetPassword)

  const userByEmail = await Users.findOne({ email })
  if (!userByEmail) {
    throw new Error('Reset-password error- Email')
  }
  //* Generar token

  userByEmail.tokenResetPassword = crypto.randomBytes(20).toString('hex')
  userByEmail.expiraResetPassword = Date.now() + 3600000

  await userByEmail.save()

  return userByEmail.tokenResetPassword
}

// async function sendEmailPassword(email, resetUrl) {
//   await sendEmail.sendEmail({
//     email,
//     subject: 'Password Reset',
//     resetUrl,
//     file,
//   })
// }

async function resetPassword(tokenResetPassword) {
  const userByToken = await Users.findOne({
    tokenResetPassword,
    expiraResetPassword: {
      $gt: Date.now(),
    },
  })
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  signUp,
  login,
  generateTokenReset,
  resetPassword,
}

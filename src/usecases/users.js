const Users = require('../models/users')
const bcrypt = require('../lib/bcrypt.js')
const jwt = require('../lib/jwt')
const crypto = require('crypto')
// const sendMail = require('@sendgrid/mail')

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

async function generateTokenReset(email) {
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

async function checkLinkToken(tokenResetPassword) {
  const userByToken = await Users.findOne({
    tokenResetPassword,
    expiraResetPassword: {
      $gt: Date.now(),
    },
  })
  if (!userByToken) {
    throw new Error('Invalid token')
  }
  console.log(userByToken)
}

async function saveNewPassword(tokenResetPassword, newPassword) {
  const userByToken = await Users.findOne({
    tokenResetPassword,
    expiraResetPassword: {
      $gt: Date.now(),
    },
  })
  if (!userByToken) {
    throw new Error('Invalid token')
  }

  const encriptedPassword = await bcrypt.hash(newPassword)

  userByToken.password = encriptedPassword
  userByToken.tokenResetPassword = undefined
  userByToken.expiraResetPassword = undefined

  return await userByToken.save()
}

//ToDo: send reset password email

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  signUp,
  login,
  generateTokenReset,
  checkLinkToken,
  saveNewPassword,
}

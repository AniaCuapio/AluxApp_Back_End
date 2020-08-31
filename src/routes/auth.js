const express = require('express')
const router = express.Router()
const user = require('../usecases/users')
const { request } = require('express')
const mailer = require('../lib/email')

router.post('/sign-up', async (request, response) => {
  try {
    const signUpUser = await user.signUp(request.body)
    response.json({
      success: true,
      data: {
        user: signUpUser,
      },
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message,
    })
  }
})

router.post('/log-in', async (request, response) => {
  try {
    const { email, password } = request.body
    const token = await user.login(email, password)
    response.json({
      success: true,
      data: {
        token,
      },
    })
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      error: error.message,
    })
  }
})

//! endpoints to Reset password
//* Reset password (emails)
router.get('/reset-password', async (request, response) => {
  try {
    response.json({
      success: true,
      message: 'endpoint: reset password',
    })
  } catch (error) {
    response.json({
      success: false,
      error: error.message,
    })
  }
})

router.post('/reset-password', async (request, response) => {
  try {
    const { email } = request.body
    const tokenResetPassword = await user.generateTokenReset(email)
    const resetUrl = `http://localhost:3000/reset-password/${tokenResetPassword}`
    console.log(resetUrl)
    //ToDo : Enviar por correo
    mailer.sendEmail(email, resetUrl)

    response.json({
      success: true,
      data: {
        resetUrl,
      },
    })
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      error: error.message,
    })
  }
})

//* Reset password and save DB
router.get('/reset-password/:token', async (request, response) => {
  try {
    const tokenResetPassword = request.params.token
    await user.checkLinkToken(tokenResetPassword)
    response.json({
      success: true,
      message: 'Correct Token ',
    })
  } catch (error) {
    response.json({
      success: false,
      error: error.message,
    })
  }
})
router.post('/reset-password/:token', async (request, response) => {
  try {
    const tokenResetPassword = request.params.token
    const { password } = request.body
    const newData = await user.saveNewPassword(tokenResetPassword, password)
    response.json({
      success: true,
      data: newData,
      message: 'save new password ',
    })
  } catch (error) {
    response.json({
      success: false,
      error: error.message,
    })
  }
})
module.exports = router

const jwt = require('../lib/jwt')
const { response } = require('express')
//Este  middleware verifica que el archivo este autorizado que exista el token
function auth(request, response, next) {
  try {
    const { authorization } = request.headers
    console.log('auth:', authorization)
    const decodedToken = jwt.verify(authorization)
    console.log('decoded token:', decodedToken)

    next()
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = auth

const express = require('express')
const users = require('../usecases/users')
const router = express.Router()
const auth = require('../middleware/auth')

//Middleware de authentication a nivel de router
router.use(auth)

router.get('/', async (request, response) => {
  try {
    const allUsers = await users.getAll()
    response.json({
      success: true,
      data: {
        users: allUsers,
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

router.get('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const userById = await users.getById(id)
    response.json({
      success: true,
      data: {
        user: userById,
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

router.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const remove = await users.remove(id)
    response.json({
      success: true,
      message: 'user deleted',
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message,
    })
  }
})

router.patch('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const newUserData = request.body
    const update = await users.update(id, newUserData)
    response.json({
      success: true,
      data: {
        update,
      },
      message: 'User successfully updated',
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message,
    })
  }
})

module.exports = router

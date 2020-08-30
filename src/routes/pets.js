const express = require('express')
const pets = require('../usecases/pets')
const users = require('../usecases/users')
const router = express.Router()
const auth = require('../middleware/auth')
const { sign, verify } = require('../lib/jwt')
const email = require('../lib/email')

router.get('/', async (request, response) => {
  try {
    const allPets = await pets.getAll()
    response.json({
      success: true,
      data: {
        pets: allPets,
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
    const petById = await pets.getById(id)
    const token = sign({ id }, `${20}y`)
    response.json({
      success: true,
      data: {
        pet: petById,
        token,
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

router.post('/', auth, async (request, response) => {
  try {
    const newPetData = request.body
    const newPet = await pets.create(newPetData)
    response.json({
      success: true,
      data: {
        newPet,
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

router.delete('/:id', auth, async (request, response) => {
  try {
    const id = request.params.id
    const remove = await pets.remove(id)
    response.json({
      success: true,
      message: 'Pet deleted',
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message,
    })
  }
})

router.patch('/:id', auth, async (request, response) => {
  try {
    const id = request.params.id
    const newPetData = request.body
    const update = await pets.update(id, newPetData)
    response.json({
      success: true,
      data: {
        update,
      },
      message: 'Pet successfully updated',
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      error: error.message,
    })
  }
})

router.post('/readQR', async (request, response) => {
  try {
    const token = request.query.token
    const coords = request.body.coords

    const { id } = await verify(token)
    const petById = await pets.getById(id)
    const owner = await users.getById(petById.owner)

    console.log(owner)
    email.sendQRReadEmail(owner.email, coords)

    response.json({
      success: true,
      data: petById,
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

const Pets = require('../models/pets')

function getAll() {
  return Pets.find()
}

async function getById(petId) {
  console.log(petId)
  const petById = await Pets.findOne({ _id: petId }).populate('owner')

  if (!petById) {
    throw new Error('Dato incorrecto')
  }
  return petById
}

function create(petData) {
  return Pets.create(petData)
}

function remove(petId) {
  return Pets.findByIdAndDelete(petId)
}

function update(petId, newPetData) {
  return Pets.findByIdAndUpdate(petId, newPetData)
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
}

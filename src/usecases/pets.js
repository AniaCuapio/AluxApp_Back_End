const Pets = require('../models/pets')

function getAll() {
  return Pets.find()
}

function getById(petId) {
  return Pets.findById(petId)
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

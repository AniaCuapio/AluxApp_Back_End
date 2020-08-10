const Pets = require("../models/entries");

function getAll() {
  return Pets.find();
}

function getByID(petId) {
  return Pets.findById(petId);
}

function create(petData) {
  return Pets.create(petData);
}

function remove(petId) {
  return Pets.findByIdAndDelete(petId);
}

function update(petId, newPetData) {
  return Pets.findByIdAndUpdate(petId, newPetData);
}

module.exports = {
  getAll,
  getByID,
  create,
  remove,
  update,
};

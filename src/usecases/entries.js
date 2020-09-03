const Entries = require('../models/entries')

function getAll() {
  return Entries.find()
}

async function getById(entryId) {
  const entryById = await Entries.findOne({ _id: entryId }).populate('user')
  console.log('hi', entryById)
  if (!entryById) {
    throw new Error('Dato incorrecto')
  }
  return entryById
}

function create(entryData) {
  return Entries.create(entryData)
}

function remove(entryId) {
  return Entries.findByIdAndDelete(entryId)
}

function update(entryId, newEntryData) {
  return Entries.findByIdAndUpdate(entryId, newEntryData)
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
}

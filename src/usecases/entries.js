const Entries = require('../models/entries')

function getAll() {
  return Entries.find()
}

function getById(entryId) {
  return Entries.findById(entryId)
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

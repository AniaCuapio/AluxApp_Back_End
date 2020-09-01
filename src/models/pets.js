const mongoose = require('mongoose')
const petsSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    //    required: true,
  },
  updatedAt: {
    type: Date,
  },
  pictures: {
    type: Array,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false,
  },
  sex: {
    type: String,
    required: true,
    enum: ['female', 'male', 'unknown'],
  },
  birthDate: {
    type: Date,
    required: false,
  },
  particularSigns: {
    type: String,
    required: false,
  },
  medicalInformation: {
    type: Object,
    required: false,
  },
  address: {
    type: Object,
    required: false,
  },
  lostAddress: {
    type: Object,
    required: false,
  },
  qrCode: {
    type: Object, //token?
  },
  memberSince: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  about: {
    type: String,
    required: false,
  },
  character: {
    type: Array,
    required: false,
  },
  status: {
    enum: ["normal", "isMissing", "isAvailableForAdoption"],
    type: String,
    required: true,
    default: "normal"
  },
  entries: {
    type: Array,
  },
  poster: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model('pets', petsSchema)

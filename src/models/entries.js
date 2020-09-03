const mongoose = require('mongoose')
const entriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'pets',
    required: true,
  },
  imageurl: {
    type: String,
    required: false,
  },
  tags: {
    type: String,
    require: false,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  likes: {
    type: Number,
  },
})

module.exports = mongoose.model('entries', entriesSchema)

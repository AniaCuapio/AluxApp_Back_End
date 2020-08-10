const mongoose = require("mongoose");
const entriesSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
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
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
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
});

module.exports = mongoose.model("entries", entriesSchema);

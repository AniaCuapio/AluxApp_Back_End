const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  id: {
    required: true,
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    match: /^.+@.+\..+$/,
  },
  password: {
    type: String,
    required: true,
  },
  memberSince: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  isPremiumUser: {
    type: Boolean,
  },
  pets: {
    type: Object,
  },
  shippingAdress: {
    type: Object,
  },
  socialNetworks: {
    type: Array,
  },
  phoneNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("users", usersSchema);

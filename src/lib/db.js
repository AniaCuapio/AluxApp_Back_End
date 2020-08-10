//Nospermite acceder a una variable de entorno el .env

const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

module.exports = () => {
  //retorna una promesa acciones asincronas
  return mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

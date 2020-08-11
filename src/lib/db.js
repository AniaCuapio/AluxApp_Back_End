//Nospermite acceder a una variable de entorno el .env

const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env,
  CONECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

module.exports = () => {
  //retorna una promesa acciones asincronas
  return mongoose.connect(CONECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

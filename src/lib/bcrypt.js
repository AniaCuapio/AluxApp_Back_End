//function hash encriptar
const bcrypt = require("bcrypt");
const saltRound = 10;

function hash(plainText) {
  return bcrypt.hash(plainText, saltRound);
}

module.exports = {
  ...bcrypt,
  hash,
};

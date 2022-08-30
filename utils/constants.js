require('dotenv').config();

const {
  dataMovies = 'mongodb://127.0.0.1/bitfilmsdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const urlReg = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.,~#?&//=!]*$)/;

module.exports = {
  dataMovies,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  urlReg,
};

const Movie = require('../models/movie');
const InternalServerError = require('../errors/InternalServerError');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const dataMovie = req.body;
  dataMovie.owner = req.user._id;
  Movie.create(dataMovie)
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(new InternalServerError());
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        const errNotFound = new NotFound('Фильма не существует');
        throw errNotFound;
      }
      if (movie.owner.toString() !== req.user._id) {
        const errForbidden = new Forbidden('Нет прав на удаление фильма');
        throw errForbidden;
      }
      return Movie.findByIdAndRemove(req.params._id)
        .then((movieDelete) => res.send(movieDelete));
    })
    .catch((err) => {
      if (err.name === 'NotFound') {
        next(err);
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      if (err.name === 'Forbidden') {
        next(err);
        return;
      }
      next(new InternalServerError());
    });
};

const router = require('express').Router();

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  validationCreateMovie, validationDeleteMovie,
} = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validationCreateMovie, createMovie);
router.delete('/movies/:_id', validationDeleteMovie, deleteMovie);

module.exports = router;

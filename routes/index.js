const router = require('express').Router();
const { login, createUser, signout } = require('../controllers/users');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const NotFound = require('../errors/NotFound');
const auth = require('../middlewares/auth');
const { validationSignin, validationSignup } = require('../middlewares/validation');

router.post('/signin', validationSignin, login);

router.post('/signup', validationSignup, createUser);

router.post('/signout', signout);

router.use(auth, userRouter);
router.use(auth, moviesRouter);

router.use(() => {
  throw new NotFound('Страница не найдена');
});

module.exports = router;

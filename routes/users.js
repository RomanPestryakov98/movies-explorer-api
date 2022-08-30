const router = require('express').Router();
const { infoUser, updateUser } = require('../controllers/users');
const { validationUpdateUser } = require('../middlewares/validation');

router.get('/users/me', infoUser);
router.patch('/users/me', validationUpdateUser, updateUser);

module.exports = router;

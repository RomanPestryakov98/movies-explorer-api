const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { infoUser, updateUser } = require('../controllers/users');

router.get('/me', infoUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email(),
  }),
}), updateUser);

module.exports = router;

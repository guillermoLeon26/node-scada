const { body } = require('express-validator/check');

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Ingrese un email valido.')
    .normalizeEmail(),

  body('password', 'Ingrese una contraseña.')
    .isAlphanumeric()
    .trim()
];

module.exports = {
  validateLogin
}

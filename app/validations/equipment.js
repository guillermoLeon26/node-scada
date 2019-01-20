const { body } = require('express-validator/check');

const validatePost = [
  body('codigo')
    .not().isEmpty().withMessage('Debe ingresar un codigo.'),

  body('nombre')
    .not().isEmpty().withMessage('Debe ingresar un nombre.')
    .isAlphanumeric().withMessage('Debe ingresar un nombre valido.'),
  
  body('marca')
    .not().isEmpty().withMessage('Debe ingresar una marca.'),
    
  body('modelo')
    .not().isEmpty().withMessage('Debe ingresar un modelo.'),
];

module.exports = {
  validatePost
}

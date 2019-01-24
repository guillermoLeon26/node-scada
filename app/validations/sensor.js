const { body } = require('express-validator/check');

const validatePost = [
  body('tipo')
    .not().isEmpty().withMessage('Debe ingresar un tipo de sensor.'),

  body('unidad')
    .not().isEmpty().withMessage('Debe ingresar una unidad de medida.'),
  
  body('marca')
    .not().isEmpty().withMessage('Debe ingresar una marca.'),
    
  body('modelo')
    .not().isEmpty().withMessage('Debe ingresar un modelo.'),

  body('serie')
    .not().isEmpty().withMessage('Debe ingresar la serie.'),

  body('ubicacion')
    .not().isEmpty().withMessage('Debe ingresar una ubicacion')
];

module.exports = {
  validatePost
}

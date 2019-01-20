const { validationResult } = require('express-validator/check');

const Equipment = require('../../models/equipment');

exports.getIndex = (req, res, next) => {
  res.render('admin/equipment/index');
}

exports.getCreate = (req, res, next) => {
  res.render('admin/equipment/create', {
    errors: null,
    oldInput: null
  });
}

exports.postStore = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error();
      err.statusCode = 401;
      err.lista = errors.array();
      throw err;
    }

    await Equipment.registrarEquipo(req.body);
    // const data = await User.usuarios(req);

    // res.render('admin/user/index', data);
    res.render('admin/equipment/index');
  } catch (error) {
    if (error.statusCode === 401) {
      return res.status(422).render('admin/equipment/create', {
        errors: error.lista,
        oldInput: {
          codigo: req.body.codigo,
          nombre: req.body.nombre,
          marca: req.body.marca,
          modelo: req.body.modelo
        }
      });
    }

    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

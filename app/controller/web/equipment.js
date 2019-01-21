const { validationResult } = require('express-validator/check');

const Equipment = require('../../models/equipment');

exports.getIndex = async (req, res, next) => {
  try {
    const data = await Equipment.equipos(req);
  
    res.render('admin/equipment/index', data);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
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
    
    res.redirect('/admin/equipment');
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

exports.postUpdate = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Equipment.actualizarEquipo(id, req.body);

    res.redirect('/admin/equipment');
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

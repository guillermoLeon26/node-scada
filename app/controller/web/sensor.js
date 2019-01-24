const { validationResult } = require('express-validator/check');

const Sensor = require('../../models/sensor');

exports.getIndex = async (req, res, next) => {
  try {
    const data = await Sensor.sensores(req);

    res.render('admin/sensor/index', data);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.getCreate = (req, res, next) => {
  const idEquipment = req.params.idEquipment;

  res.render('admin/sensor/create', {
    errors: null,
    oldInput: null,
    idEquipment: idEquipment
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
    
    await Sensor.registrar(req.body);

    res.redirect(`/admin/sensor/${ req.body.idEquipment }`);
  } catch (error) {
    if (error.statusCode === 401) {
      return res.status(422).render('admin/sensor/create', {
        idEquipment: req.body.idEquipment,
        errors: error.lista,
        oldInput: {
          tipo: req.body.tipo,
          unidad: req.body.unidad,
          marca: req.body.marca,
          modelo: req.body.modelo,
          serie: req.body.serie,
          ubicacion: req.body.ubicacion
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
    const idEquipment = req.body.idEquipment;
    const sensor = await Sensor.findById(req.params.idSensor);

    sensor.actualizar(req.body);

    res.redirect(`/admin/sensor/${idEquipment}`);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

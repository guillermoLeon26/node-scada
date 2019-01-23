const Sensor = require('../../models/sensor');

exports.getIndex = async (req, res, next) => {
  try {
    const data = await Sensor.sensores(req);

    console.log(data);

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
    const sensor = await Sensor.registrar(req.body);

    res.redirect(`/admin/sensor/${ req.body.idEquipment }`);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

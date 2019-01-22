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

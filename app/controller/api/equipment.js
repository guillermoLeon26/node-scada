const Equipment = require('../../models/equipment');

exports.getIndex = async (req, res, next) => {
  const equipos = await Equipment.find().populate('sensores');

  res.status(200).json({
    equipos: equipos
  });
}

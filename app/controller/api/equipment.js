const equipment = require('../../models/equipment');

exports.postIndex = async (req, res, next) => {
  const equipos = await equipment.find().populate('sensores');

  res.status(200).json({
    equipos: equipos
  });
}

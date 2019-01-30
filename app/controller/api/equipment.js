const io = require('../../../config/socket');
const Equipment = require('../../models/equipment');

exports.getIndex = async (req, res, next) => {
  const equipos = await Equipment.find().populate('sensores');

  res.status(200).json({
    equipos: equipos
  });
}

exports.postEmitBroadcasting = (req, res, next) => {
  io.getIO().emit('sensor', {
    data: req.body
  });

  res.status(200).json({});
}

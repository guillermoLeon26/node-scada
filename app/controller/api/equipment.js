const AWS = require('../../../config/aws');
const Equipment = require('../../models/equipment');

exports.getIndex = async (req, res, next) => {
  const equipos = await Equipment.find().populate('sensores');

  res.status(200).json({
    equipos: equipos
  });
}

exports.getInfoScada = (req, res, next) => {
  const iotdata = new AWS.IotData({ endpoint: 'a39cpvubvptkow-ats.iot.us-west-2.amazonaws.com' });
  const params = { thingName: 'Bomba1'};
  
  iotdata.getThingShadow(params, (err, data) => {
    if (err) next(err.stack);
    
    res.status(200).send(data);
  });
}

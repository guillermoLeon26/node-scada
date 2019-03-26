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

exports.getHistorySensor = (req, res, next) => {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName : 'sensores_scada',
    KeyConditionExpression: 'fecha = :idx',
    ExpressionAttributeValues: {
      ':idx': 3
      //':ini': '1',
      //':fin': '2',
      //':mod': '5756'
    }
  }

  docClient.query(params, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log(data);
      res.status(200).send(data);
    }
  });
}
/*
SELECT concat(topic(), '/', timestamp()) AS id, modelo, sensor, timestamp() AS timestamp FROM 'prueba/#' WHERE save = true
*/


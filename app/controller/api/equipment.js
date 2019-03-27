const moment = require('moment');

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

  var fecha1 = moment('26/3/2019 22:33:59', 'DD/M/YYYY HH:mm:ss').unix(); // 1553657639 - 26/3/2019 22:33:59
  var fecha2 = moment('26/3/2019 23:02:25', 'DD/M/YYYY HH:mm:ss').unix(); // 1553658361 - 26/3/2019 22:46:01

  var params = {
    TableName : 'scada_prueba',
    KeyConditionExpression: 'topic = :topic AND #tiempo BETWEEN :fecha1 AND :fecha2',
    ExpressionAttributeNames: {
      '#tiempo': 'timestamp'
    },
    ExpressionAttributeValues: {
      ':topic': 'prueba/maquina',
      ':fecha1': fecha1, 
      ':fecha2': fecha2 
    }
  }

  docClient.query(params, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      res.status(200).send(data);
    }
  });
}

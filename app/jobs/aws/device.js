const thingShadow = require('aws-iot-device-sdk').thingShadow;

const config = require('../../../config/aws-iot-certs/config_file');

module.exports = () => {
  console.log('aws')
  const thingShadows = thingShadow({
    keyPath: config.privateKey,
    certPath: config.clientCert,
    caPath: config.caCert,
    clientId: config.clientId,
    region: config.region,
    baseReconnectTimeMs: config.baseReconnectTimeMs,
    keepalive: config.keepAlive,
    protocol: config.Protocol,
    port: config.port,
    host: config.host,
    debug: config.Debug
  });

  //thingShadows.on('status', function(thingName, stat, clientToken, stateObject) {
  //  console.log('received '+stat+' on '+thingName+': '+JSON.stringify(stateObject));
  //});

  thingShadows.on('delta', 
    function(thingName, stateObject) {
       console.log('received delta on '+thingName+': '+
                   JSON.stringify(stateObject));
    });
}

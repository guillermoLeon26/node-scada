const path = require('path')

module.exports = {
  host:                 'a39cpvubvptkow-ats.iot.us-west-2.amazonaws.com',
  port:                 8883,
  clientId:             'RaspGateWay',
  thingName:            'scada-node-thing',
  caCert:               path.join(__dirname, 'x509.pem'),
  clientCert:           path.join(__dirname, 'certificate.pem.crt'),
  privateKey:           path.join(__dirname, 'private.pem.key'),
  protocol:             'mqtts',
  testMode:             1,
  baseReconnectTimeMs:  4000, /* milliseconds */
  keepAlive:            300,  /* seconds */
  delay:                4000, /* milliseconds */
  Debug:                false,
  region:               'us-west-2'
}

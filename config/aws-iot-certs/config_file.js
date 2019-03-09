const path = require('path')

module.exports = {
  host:                 'a39cpvubvptkow-ats.iot.us-west-2.amazonaws.com',
  port:                 8883,
  clientId:             'RaspGateWay',
  thingName:            'test_geteway_rasp',
  caCert:               path.join(__dirname, 'x509.pem'),
  clientCert:           path.join(__dirname, 'b1cfb3c282-certificate.pem.crt'),
  privateKey:           path.join(__dirname, 'b1cfb3c282-private.pem.key'),
  protocol:             'mqtts',
  testMode:             1,
  baseReconnectTimeMs:  4000, /* milliseconds */
  keepAlive:            300,  /* seconds */
  delay:                4000, /* milliseconds */
  Debug:                false,
  region:               'us-west-2'
}

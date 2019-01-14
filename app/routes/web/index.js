const inData = require('../../../config/inData');
const cookies = require('../../../config/cookies');
const csrf = require('../../../config/csrf');
const homeRoutes = require('./home');
const authRoutes = require('./auth');

module.exports = app => {
  inData(app) // Configuracion para el cambio de los datos de entrada.
  cookies(app); // Configuracion de los cookies.
  csrf(app);  // Configuracion de la proteccion por csrf.

  app.use('/admin', homeRoutes);
  app.use('/admin', authRoutes);
}

const inData = require('../../../config/inData');
const cookies = require('../../../config/cookies');
const csrf = require('../../../config/csrf');
const errorController = require('../../controller/error');

const User = require('../../models/user');
const initRoutes = require('./init');
const homeRoutes = require('./home');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const equipmentRotes = require('./equipment');
const sensorRoutes = require('./sensor');

module.exports = app => {
  inData(app) // Configuracion para el cambio de los datos de entrada.
  cookies(app); // Configuracion de los cookies.
  csrf(app);  // Configuracion de la proteccion por csrf.

  // ----------Inyeccion de Usuario cuando esta Logeado--------------
  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }

    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  });
  // ----------------------------------------------------------------

  app.use('/', initRoutes);
  app.use('/admin', homeRoutes);
  app.use('/admin', authRoutes);
  app.use('/admin/user', userRoutes);
  app.use('/admin/equipment', equipmentRotes);
  app.use('/admin/sensor', sensorRoutes);
}

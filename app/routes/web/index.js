const inData = require('../../../config/inData');
const cookies = require('../../../config/cookies');
const csrf = require('../../../config/csrf');
const errorController = require('../../controller/web/error');

const User = require('../../models/user');
const homeRoutes = require('./home');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const equipmentRotes = require('./equipment');

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

  app.use('/admin', homeRoutes);
  app.use('/admin', authRoutes);
  app.use('/admin/user', userRoutes);
  app.use('/admin/equipment', equipmentRotes);

  //--------------------Manejo de pagina de errores------------------------
  app.get('/500', errorController.get500);
  app.use(errorController.get404);
  /* -------Activar en produccion, por ahora sirve para ver errores en render de las vistas
    app.use((error, req, res, next) => { 
    res.status(500).render('error/500', {
      isAuthenticated: req.session.isLoggedIn
    });
  });
  */
}

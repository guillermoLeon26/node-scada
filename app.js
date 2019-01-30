const path = require('path');

const express = require('express');

const db = require('./config/db');
const socket = require('./config/socket');
const session = require('./config/session');
const webRoutes = require('./app/routes/web/index');
const apiRoutes = require('./app/routes/api/index');
const errorController = require('./app/controller/error');

const app = express();

// --------------Configuracion de motor de plantillas--------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));
// ----------------------------------------------------------------

// -------------------Configuracion de session---------------------
session(app);
// ----------------------------------------------------------------

// --------------Configuracion de archivos estaticos---------------
app.use(express.static(path.join(__dirname, 'public')));
// ----------------------------------------------------------------

// -------------------Configuracion de rutas-----------------------
apiRoutes(app);
webRoutes(app);

// ----------------------------------------------------------------
app.use(errorController.get404);
//--------------------Manejo de pagina de errores------------------------
// -------Activar en produccion, por ahora sirve para ver errores en render de las vistas
app.use((error, req, res, next) => {
  if (req.is('application/json')) {
    const status = error.statusCode || 500;
    var errors = [];

    if (error.lista) {
      console.log(error.lista)
      errors = error.lista.map((item, index) => {
        return item.msg
      });

      res.status(status).json({ errors: errors });
    }

    res.status(status).json({ error: error });
   
  } else {
    res.status(500).render('error/500', {
      isAuthenticated: req.session.isLoggedIn
    });
  }
});

db.connect()
  .then(result => {
    const server = app.listen(3000);
    const io = socket.init(server);
    io.on('connection', socket => {
      console.log('Client connected');
    });
  })
  .catch(err => {
    console.log(err);
  });

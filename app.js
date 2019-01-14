const path = require('path');

const express = require('express');

const db = require('./config/db');
const session = require('./config/session');
const webRoutes = require('./app/routes/web/index');

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

// --------------Configuracion de rutas----------------------------
webRoutes(app);
// ----------------------------------------------------------------

db.connect()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

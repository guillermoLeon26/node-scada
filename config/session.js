const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const db = require('../config/db');

const store = new MongoDBStore({
  uri: db.uri(),
  collection: 'sessions'
});

module.exports = app => {
  app.use(session({
      secret: 'scada-node-213764888256',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
}

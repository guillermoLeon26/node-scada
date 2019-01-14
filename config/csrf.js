const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true });

module.exports = app => {
  app.use(csrfProtection);
  app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  });
}

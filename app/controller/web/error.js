exports.get404 = (req, res, next) => {
  res.status(404).render('error/404', {
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render('error/500', {
    isAuthenticated: req.session.isLoggedIn
  });
};

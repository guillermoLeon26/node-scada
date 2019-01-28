exports.get404 = (req, res, next) => {
  console.log('Es json', req.is('application/json'));
  if (req.is('application/json')) {
    return res.status(404).json({
      message: 'Ruta no encontrada'
    });
  } else {
    return res.status(404).render('error/404', {
      isAuthenticated: req.session.isLoggedIn
    });
  }
};

exports.get500 = (req, res, next) => {
  res.status(500).render('error/500', {
    isAuthenticated: req.session.isLoggedIn
  });
};

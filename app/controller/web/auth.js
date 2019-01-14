const User = require('../../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login');
}

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    console.log('controlador', user.statusCode);

    req.session.isLoggedIn = true;
    req.session.user = user;

    const err = await req.session.save();

    if (err) throw new Error('Ocurrio un error en el acceso.');

    res.redirect('/admin');
  } catch (error) {
    console.log('controlador', error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

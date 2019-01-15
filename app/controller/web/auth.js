const User = require('../../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    errorMessage: null,
    oldInput: null
  });
}

exports.postLogin = async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    
    req.session.isLoggedIn = true;
    req.session.user = user;

    const err = await req.session.save();

    if (err) throw new Error('Ocurrio un error en el acceso.');

    res.redirect('/admin');
  } catch (error) {
    if (error.statusCode === 401) {
      return res.status(422).render('auth/login', {
        errorMessage: error.message,
        oldInput: {
          email: req.body.email,
          password: req.body.email.password
        }
      });
    }

    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

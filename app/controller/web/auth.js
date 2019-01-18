const User = require('../../models/user');
const { validationResult } = require('express-validator/check');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    errors: null,
    oldInput: null
  });
}

exports.postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err0 = new Error();
      err0.statusCode = 401;
      err0.lista = errors.array();
      throw err0;
    }

    const user = await User.login(req.body);
    
    req.session.isLoggedIn = true;
    req.session.user = user;

    const err = await req.session.save();

    if (err) {
      const err1 = new Error();
      err1.lista = [ { msg: 'Ocurrio un error en el acceso.' } ];
      throw err1;
    }

    res.redirect('/admin');
  } catch (error) {
    if (error.statusCode === 401) {
      return res.status(422).render('auth/login', {
        errors: error.lista,
        oldInput: {
          email: req.body.email,
          password: req.body.password
        }
      });
    }

    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.postLogout =  async (req, res, next) => {
  try {
    await req.session.destroy();
    res.redirect('/admin/login');
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error); 
  }
};

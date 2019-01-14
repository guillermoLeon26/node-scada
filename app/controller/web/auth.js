const User = require('../../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login');
}

exports.postRegister = (req, res, next) => {
  
}

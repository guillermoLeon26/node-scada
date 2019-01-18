const User = require('../../models/user');

// Lista de usuarios
exports.getIndex = async (req, res, next) => {
  try {
    const data = await User.usuarios(req);

    res.render('admin/user/index', data);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

// Vista de creacion de usuario
exports.getCreate = (req, res, next) => {
  res.render('admin/user/create', {
    errors: null
  });
}

// Guardar usuario
exports.postStoreUser = async (req, res, next) => {
  try {
    await User.registrarUsuario(req.body);
    const data = await User.usuarios(req);

    res.render('admin/user/index', data);
  } catch (error) {
    if (error.statusCode === 401) {
      return res.status(422).render('admin/user/create', {
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

const User = require('../../models/user');

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

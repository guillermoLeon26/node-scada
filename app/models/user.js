const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.registrarUsuario = async function (data) {
  const { email, password } = data;
  
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await this.create({
      email: email,
      password: hashPassword
    });

    return user;
  } catch (error) {
    console.log(error);
  }
}

userSchema.statics.login = async function (data) {
  const { email, password } = data;
  
  try {
    const user = await this.findOne({ email: email });

    if (!user) {
      const error = new Error();
      error.statusCode = 401;
      error.lista = [ { msg: 'Un usuario con este email no se encuentra.' } ];
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error();
      error.statusCode = 401;
      error.lista = [ { msg: 'Password Incorrecta!' } ];
      throw error;
    }

    return user;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
}

userSchema.statics.usuarios = async function (req) {
  const currentPage = req.query.page || 1;
  const perPage = 5;

  try {
    const totalItems = await this.find().countDocuments();
    const users = await this.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    
    return {
      users: users,
      pagination: {
        currentPage: currentPage,
        totalItems: totalItems,
        perPage: perPage,
        maxPage: Math.ceil(totalItems/perPage),
        viewPage: 5,
        offset: 2,
        url: '/admin/user'
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
}

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ValidationError = require('../error');

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
  console.log(email, password);

  try {
    const user = await this.findOne({ email: email });

    console.log(!user);

    if (!user) {
      throw new ValidationError('Un usuario con este email no se encuentra.', 401);
      //const error = new Error('Un usuario con este email no se encuentra.');
      //error.statusCode = 401;
      //throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error('Password Incorrecta!');
      error.statusCode = 401;
      throw error;
    }

    return user;
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return error;
  }
}

module.exports = mongoose.model('User', userSchema);

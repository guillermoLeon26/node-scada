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
  const {email, password} = data;
  
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

module.exports = mongoose.model('User', userSchema);

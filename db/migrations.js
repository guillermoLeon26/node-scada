const db = require('../config/db');
const user = require('../app/models/user');

data = {
  email: 'gleon@gmail.com',
  password: 'guillermo'
}

const crearUsuario = () => {
  db.connect()
    .then(result => {
      user.registrarUsuario(data);
    })
    .catch(error => {
      console.log(error);
    });
}

crearUsuario();

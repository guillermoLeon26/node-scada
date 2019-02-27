const db = require('../config/db');
const user = require('../app/models/user');
const Equipo = require('../app/models/equipment');

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

const crearEquipos = () => {
  db.connect()
    .then(result => {
      for (let i = 17; i < 22; i++) {
        const data = `COMP${i+1}`;
        Equipo.registrarEquipo({ 
          codigo: data, 
          nombre: data, 
          marca: data, 
          modelo: data
        }) 
      }
    })
    .catch(error => {
      console.log(error);
    });
}

crearUsuario();
// crearEquipos();

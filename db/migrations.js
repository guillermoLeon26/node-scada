const db = require('../config/db');
const user = require('../app/models/user');
const Equipo = require('../app/models/equipment');
const IotCredentials = require('../app/models/iotCredentials');

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

const crearIotCredentials = () => {
  db.connect().then(result => {
    const data = {
      accessKeyID: 'AKIAIQAVQ3XUHQSMX5YQ',
      secretAccessKey: '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'
    }
    IotCredentials.create(data, (err, reg) => {
      if (err) {
        console.log(err);
      } else {
        console.log(reg);
      }
    })
  });
}

crearIotCredentials();
// crearUsuario();
// crearEquipos();

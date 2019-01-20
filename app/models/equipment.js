const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  codigo: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },  
  estado: {
    type: Boolean,
    default: true
  },
});

equipmentSchema.statics.equipos = async function (req) {
  const currentPage = req.query.page || 1;
  const perPage = 5;

  try {
    
  } catch (error) {
    
  }
}

equipmentSchema.statics.registrarEquipo = async function (data) {
  const { codigo, nombre, marca, modelo } = data;
  
  try {
    var equip = await this.findOne({ codigo: codigo });

    if (equip) {
      const error = new Error();
      error.statusCode = 401;
      error.lista = [ { msg: 'Ya existe un equipo con este codigo.' } ];
      throw error;
    }

    equip = await this.create({
      codigo: codigo,
      nombre: nombre,
      marca: marca,
      modelo: modelo
    });

    return equip;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
}

module.exports = mongoose.model('Equipment', equipmentSchema);

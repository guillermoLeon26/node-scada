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
  sensores: [{
      type: Schema.Types.ObjectId,
      ref: 'Sensor'
  }]
});

equipmentSchema.statics.equipos = async function (req) {
  const currentPage = req.query.page || 1;
  const perPage = 5;
  
  try {
    const totalItems = await this.find().countDocuments();
    const equipos = await this.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    
    return {
      equipos: equipos,
      pagination: {
        currentPage: currentPage,
        totalItems: totalItems,
        perPage: perPage,
        maxPage: Math.ceil(totalItems/perPage),
        viewPage: 5,
        offset: 2,
        url: '/admin/equipment'
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
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

equipmentSchema.statics.actualizarEquipo = async function (id, data) {
  try {
    const equipo = await this.findById(id);

    equipo.codigo = data.codigo || equipo.codigo;
    equipo.nombre = data.nombre || equipo.nombre;
    equipo.modelo = data.modelo || equipo.modelo;
    equipo.marca = data.marca || equipo.marca;
    equipo.estado = data.estado || equipo.estado;

    await equipo.save();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error;
  }
}

module.exports = mongoose.model('Equipment', equipmentSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
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
  ubicacion: {
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

module.exports = mongoose.model('Equipment', equipmentSchema);

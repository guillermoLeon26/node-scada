const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const iotCredentialsSchema = new Schema({
  accessKeyID: {
    type: String,
    required: true
  },
  secretAccessKey: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('IotCredentials', iotCredentialsSchema);

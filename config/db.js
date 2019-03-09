const mongoose = require('mongoose');

const DB_NAME = 'Scada';
const DB_USER = 'node';
const DB_PASS = 'node213764888256'

const MONGODB_URI =  
  `mongodb+srv://${DB_USER}:${DB_PASS}@scada-xoozi.mongodb.net/${DB_NAME}?retryWrites=true`;
  //  `mongodb://localhost:27017/${DB_NAME}`;

module.exports = class db {
  static uri () {
    return MONGODB_URI;
  }

  static connect () {
    return mongoose.connect(MONGODB_URI);
    //  return mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
  }
}

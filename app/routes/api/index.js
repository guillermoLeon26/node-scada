const bodyParser = require('body-parser');

const authRoutes = require('./auth');
const equipmentRoutes = require('./equipment');

module.exports = app => {
  app.use('/api/*', bodyParser.json());

  app.use('/api/*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/equipment', equipmentRoutes);
}

const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/scada-api', (req, res, next) => {
  return res.sendFile(path.join(__dirname, '../../../public/scada-api', 'index1.html'));
});

module.exports = router;

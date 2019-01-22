const express = require('express');

const sensorController = require('../../controller/web/sensor');
const isAuth = require('../../middleware/is-auth');

const router = express.Router();

// /admin/sensor

router.get('/:idEquipment', isAuth, sensorController.getIndex);

module.exports = router;

const express = require('express');

const sensorController = require('../../controller/web/sensor');
const isAuth = require('../../middleware/is-auth');
const sensorValidate = require('../../validations/sensor');

const router = express.Router();

// /admin/sensor

router.get('/:idEquipment', isAuth, sensorController.getIndex);

router.get('/create/:idEquipment', isAuth, sensorController.getCreate);

router.post('/', isAuth, sensorValidate.validatePost, sensorController.postStore);

router.post('/update/:idSensor', isAuth, sensorController.postUpdate);

module.exports = router;

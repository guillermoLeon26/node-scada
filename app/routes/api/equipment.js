const express = require('express');

const isAuth = require('../../middleware/is-auth-api');
const equipmentController = require('../../controller/api/equipment');

const router = express.Router();

// /api/equipment

router.get('/index', isAuth, equipmentController.getIndex);
router.post('/sensorBroadcasting', equipmentController.postEmitBroadcasting);

module.exports = router;

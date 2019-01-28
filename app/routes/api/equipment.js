const express = require('express');

const equipmentController = require('../../controller/api/equipment');

const router = express.Router();

router.get('/index', equipmentController.getIndex);

module.exports = router;

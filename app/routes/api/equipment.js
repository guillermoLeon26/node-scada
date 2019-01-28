const express = require('express');

const equipmentController = require('../../controller/api/equipment');

const router = express.Router();

router.post('/index', equipmentController.postIndex);

module.exports = router;

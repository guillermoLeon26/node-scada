const express = require('express');

const isAuth = require('../../middleware/is-auth-api');
const equipmentController = require('../../controller/api/equipment');

const router = express.Router();

router.get('/index', isAuth, equipmentController.getIndex);

module.exports = router;

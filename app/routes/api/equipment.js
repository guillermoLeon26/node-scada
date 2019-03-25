const express = require('express');

const isAuth = require('../../middleware/is-auth-api');
const equipmentController = require('../../controller/api/equipment');

const router = express.Router();

// /api/equipment

router.get('/index', isAuth, equipmentController.getIndex);
router.get('/getInfoScada', isAuth,equipmentController.getInfoScada);

module.exports = router;

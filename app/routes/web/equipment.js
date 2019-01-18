const express = require('express');

const equipmentController = require('../../controller/web/equipment');
const isAuth = require('../../middleware/is-auth');
// const userValidate = require('../../validations/user');

const router = express.Router();

// /admin/equipment

router.get('/', isAuth, equipmentController.getIndex);

module.exports = router;

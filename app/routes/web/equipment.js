const express = require('express');

const equipmentController = require('../../controller/web/equipment');
const isAuth = require('../../middleware/is-auth');
const equipmentValidate = require('../../validations/equipment');

const router = express.Router();

// /admin/equipment

router.get('/', isAuth, equipmentController.getIndex);

router.get('/create', isAuth, equipmentController.getCreate);

router.post('/', isAuth, equipmentValidate.validatePost ,equipmentController.postStore);

module.exports = router;

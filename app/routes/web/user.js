const express = require('express');

const userController = require('../../controller/web/user');

const router = express.Router();

// /admin/user

router.get('/', userController.getIndex);

module.exports = router;

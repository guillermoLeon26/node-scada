const express = require('express');

const authController = require('../../controller/web/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

module.exports = router;

const express = require('express');

const authController = require('../../controller/api/auth');
const validateAuth = require('../../validations/auth');

const router = express.Router();

router.post('/login', validateAuth.validateLogin, authController.postLogin);

module.exports = router;

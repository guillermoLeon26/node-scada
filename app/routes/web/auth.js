const express = require('express');

const authController = require('../../controller/web/auth');
const { validateLogin } = require('../../validations/auth');

const router = express.Router();

// /admin/....

router.get('/login', authController.getLogin);

router.post('/login', validateLogin, authController.postLogin);

router.post('/logout', authController.postLogout);

module.exports = router;

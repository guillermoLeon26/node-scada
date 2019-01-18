const express = require('express');

const userController = require('../../controller/web/user');
const isAuth = require('../../middleware/is-auth');
const userValidate = require('../../validations/user');

const router = express.Router();

// /admin/user

router.get('/', isAuth, userController.getIndex);

router.get('/create', isAuth, userController.getCreate);

router.post('/', isAuth, userValidate.validateLogin, userController.postStoreUser);

router.post('/delete', isAuth, userController.postDeleteUser);

module.exports = router;

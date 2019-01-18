const express = require('express');

const userController = require('../../controller/web/user');

const router = express.Router();

// /admin/user

router.get('/', userController.getIndex);

router.get('/create', userController.getCreate);

router.post('/', userController.postStoreUser);

module.exports = router;

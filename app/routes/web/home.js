const express = require('express');

const isAuth = require('../../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, (req, res, next) => {
    res.render('admin/home');
});

module.exports = router;

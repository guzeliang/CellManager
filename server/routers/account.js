var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/account');

router.get('/api/login', apiCtrl.login);
router.get('/api/singout', apiCtrl.singout);
router.post('/api/singup', apiCtrl.singup);

module.exports = router;
var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/sim');

router.get('/api/sim/author', apiCtrl.author);
router.get('/api/sim/location', apiCtrl.location);

module.exports = router;
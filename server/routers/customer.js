var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/customer');

router.get('/api/customer/page', apiCtrl.getPage);
router.post('/api/customer', apiCtrl.create);
router.delete('/api/customer/:id', apiCtrl.remove);

module.exports = router;
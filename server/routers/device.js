var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/device');

router.get('/api/device/page', apiCtrl.getPage);
router.post('/api/device', apiCtrl.create);
router.delete('/api/device/:id', apiCtrl.remove);
router.get('/api/iot/qrcode', apiCtrl.qr);

module.exports = router;
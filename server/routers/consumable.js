var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/consumable');

router.get('/api/consumable/page', apiCtrl.getPage);
router.post('/api/consumable', apiCtrl.create);
router.delete('/api/consumable/:id', apiCtrl.remove);

module.exports = router;
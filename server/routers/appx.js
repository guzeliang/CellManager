var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/appx');
var multer = require('../utils/multerHelper');
var upload = multer.single('file');

router.post('/api/uploadFile', apiCtrl.upload);
router.get('/api/appxs', apiCtrl.list);
router.get('/api/version', apiCtrl.getLastVersion);
router.delete('/api/appxs/:name', apiCtrl.remove);

module.exports = router;
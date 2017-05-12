var fs = require('fs');
var request = require('request');
var httpHelper = require('../utils/httpHelper');
var simHelper = require('../utils/simHelper');
var config = require('../config');
var cacheHelper = require('../utils/cacheHelper');
var models = require('../models/');
var jsonHelper = require('../utils/jsonHelper');

exports.author = function(req, res) {
    request.post({
        url: 'http://120.26.213.169/api/access_token/',
        json: true,
        form: {
            username: 'sdxbkj',
            password: '1X6D8G'
        }
    }, function(err, ret) {
        if (err) return res.json(err.message);
        res.json(ret);
    })
}

exports.location = function(req, res) {
    var mcc = req.query.mcc;
    var mnc = req.query.mnc;
    var lac = req.query.lac;
    var ci = req.query.ci;
    var deviceid = req.query.deviceid;
    var deviceType = req.query.devicetype || 1; //默认为反引器

    if (!deviceid) {
        return res.json(jsonHelper.getError('deviceid is empty'));
    }

    if (!mcc && mcc !== 0) {
        return res.json(jsonHelper.getError('mcc is empty'));
    }

    if (!mnc && mnc !== 0) {
        return res.json(jsonHelper.getError('mnc is empty'));
    }

    if (!lac && lac !== 0) {
        return res.json(jsonHelper.getError('lac is empty'));
    }

    if (!ci && ci !== 0) {
        return res.json(jsonHelper.getError('ci is empty'));
    }

    var promise = '';

    if (fs.existsSync(config.SIM_AUTHOR_FILE)) {
        promise = Promise.resolve(fs.readFileSync(config.SIM_AUTHOR_FILE).toString());
    } else {
        promise = simHelper.getAuthorToken();
    }

    promise.then(function(data) {
        return simHelper.getLocation(data, mcc, mnc, lac, ci);
    }).then(function(location) {
        models.RemoteDevice.upsert({
            clientId: deviceid,
            type: deviceType,
            address: location.address
        }).then(function() {
            res.json(jsonHelper.getSuccess(location));
        });
    }).catch(function(err) {
        res.json(jsonHelper.getError(err.message));
    })
}
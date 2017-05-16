var config = require('../config');
var fs = require('fs');
var request = require('request');
var jsonHelper = require('../utils/jsonHelper');
var _ = require('underscore');
var moment = require('moment');
var models = require('../models');

exports.getPage = function(req, res, next) {
    var pageSize = +req.query.pagesize || 10;
    var pageIndex = +req.query.pageindex || 1;
    var firNum = (pageIndex - 1) * pageSize;
    var keyword = req.query.keyword || '';
    var customerId = +req.query.customerid || -1;

    var query = {
        limit: pageSize,
        offset: firNum,
        raw: true
    };

    if (keyword.trim()) {
        query.where = {
            clientId: { like: '%' + keyword + '%' }
        }
    }

    if (customerId != -1) {
        query.where = {
            customerId: customerId
        }
    }

    models.RemoteDevice.findAndCountAll(query).then(function(result) {
        var docs = result.rows;
        var count = result.count;

        res.json(jsonHelper.pageSuccess(docs, count));
    }).catch(err => {
        res.json(jsonHelper.getError(err.message));
    });
};

exports.create = function(req, res) {
    var device = req.body;
    if (device == null) {
        return res.json(jsonHelper.getError('body is empty'));
    }

    models.RemoteDevice.create(device).then(function(doc) {
        res.json(jsonHelper.getSuccess(doc));
    }).catch(err => {
        res.json(jsonHelper.getError(err.message));
    });
}

exports.remove = function(req, res) {
    var id = req.params.id;
    if (!id) {
        return res.json(jsonHelper.getError('id is null'))
    }
    models.DeviceUnionConsumable.destroy({ where: { deviceId: id } })
        .then(p => {
            return models.RemoteDevice.destroy({ where: { id: id } });
        })
        .then(function(count) {
            res.json(jsonHelper.getSuccess('删除成功'));
        }).catch(function(err) {
            res.json(jsonHelper.getError(err.message));
        })
}

exports.qr = function(req, res) {
    var id = req.query.id;
    var deviceId = req.query.deviceid;
    var deviceType = req.query.devicetype || 1;

    //如果耗材和设备没有同时传入 则需要如下判断
    //如果扫描的是耗材，先判断是否已经扫描了设备 若扫描了 就走正常流程 否则写入cookie
    //如果扫描的是设备，先判断是否已经扫描了耗材 若扫描了 就走正常流程 否则写入cookie

    if (!(id && deviceId)) {
        if (id) {
            if (req.cookies.deviceId) {
                deviceId = req.cookies.deviceId;
            } else {
                res.cookie('id', id, { expires: new Date(Date.now() + 10 * 60 * 1000), httpOnly: true });
                return res.json(jsonHelper.getError('耗材编号' + id + ', 请扫描设备'));
            }
        } else if (deviceId) {
            if (req.cookies.id) {
                id = req.cookies.id;
            } else {
                res.cookie('deviceId', deviceId, { expires: new Date(Date.now() + 10 * 60 * 1000), httpOnly: true });
                return res.json(jsonHelper.getError('设备编号' + deviceId + ', 请扫描耗材'));
            }
        }

        if (!id) {
            return res.json(jsonHelper.getError('耗材编号不能为空'));
        }

        if (!deviceId) {
            return res.json(jsonHelper.getError('设备编号不能为空'));
        }
    }

    var remoteDevice;
    var consumable;
    var usedTimes = 0;

    models.RemoteDevice.findOne({ where: { clientId: deviceId }, raw: true })
        .then(doc => {
            if (!doc) return models.RemoteDevice.create({
                clientId: deviceId,
                type: deviceType
            }, { raw: true }).then(docx => {
                remoteDevice = docx.dataValues;
                return Promise.resolve(docx);
            });
            remoteDevice = doc;
            return Promise.resolve(doc);
        })
        .then(p => {
            return models.Consumable.findOne({ where: { serialNumber: id }, raw: true });
        })
        .then(docx => {
            if (!docx) return Promise.reject(new Error('对应的耗材不存在，请重新扫描耗材'));

            consumable = docx;

            if (consumable.type !== remoteDevice.type && consumable.type != 9) {
                return Promise.reject(new Error('耗材类型与设备类型不匹配'));
            }

            return Promise.resolve(docx);
        }).then(() => { //判断该耗材使用次数是否大于5
            return models.DeviceUnionConsumable.sum('times', { where: { consumableId: consumable.id } })
        }).then((times) => {
            usedTimes = times || 0;
            if (times >= 50) {
                return Promise.reject(new Error('耗材最多只能使用50次'));
            }
            return models.DeviceUnionConsumable.findOne({ where: { consumableId: consumable.id, deviceId: remoteDevice.id }, raw: true });
        })
        .then((doc) => {
            if (!doc) {
                return models.DeviceUnionConsumable.create({ consumableId: consumable.id, deviceId: remoteDevice.id })
            } else {
                doc.times += 1;
                return models.DeviceUnionConsumable.update(doc, { where: { id: doc.id }, fields: ['times'] });
            }
        })
        .then(doc => {
            usedTimes += 1;
            var data = consumable.serialNumber + ',' + consumable.type + ',' + usedTimes;
            res.clearCookie('id');
            res.clearCookie('deviceId');
            consumable.usedTimes = usedTimes;
            res.json(jsonHelper.getSuccess(consumable));
        })
        .catch(err => {
            res.json(jsonHelper.getError(err.message));
        })
}
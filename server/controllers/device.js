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
    var keyword = req.query.keyword;
    var customerId = +req.query.customerid || -1;

    var query = {
        limit: pageSize,
        offset: firNum,
        raw: true
    };

    if (keyword) {
        query.where = {
            description: { like: '%' + keyword + '%' }
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

exports.qr = function(req, res, next) {
    var id = req.query.id;
    var deviceId = req.query.deviceid;

    if (!id) {
        return res.json('耗材编号不能为空');
    }

    if (!deviceId) {
        return res.json('设备编号不能为空');
    }
    var remoteDevie;
    var consumable;

    models.RemoteDevice.findOne({ where: { clientId: deviceId }, raw: true })
        .then(doc => {
            if (!doc) return Promise.reject(new Error('对应的设备不存在'));
            remoteDevie = doc;
            return Promise.resolve(doc);
        })
        .then(p => {
            return models.Consumable.findOne({ where: { serialNumber: id }, raw: true });
        })
        .then(docx => {
            if (!docx) return Promise.reject(new Error('对应的耗材不存在'));
            consumable = docx;
            return Promise.resolve(docx);
        }).then(() => { //判断该耗材使用次数是否大于5
            return models.DeviceUnionConsumable.sum('times', { where: { consumableId: consumable.id } })
        }).then((times) => {
            if (times >= 5) {
                return Promise.reject(new Error('耗材最多只能使用5次'));
            }
            return models.DeviceUnionConsumable.findOne({ where: { consumableId: consumable.id, deviceId: remoteDevie.id }, raw: true });
        })
        .then((doc) => {
            if (!doc)
                return models.DeviceUnionConsumable.create({ consumableId: consumable.id, deviceId: remoteDevie.id })
            else {
                doc.times += 1;
                return models.DeviceUnionConsumable.update(doc, { where: { id: doc.id }, fields: ['times'] });
            }
        })
        .then(doc => {
            res.json(jsonHelper.getSuccess(consumable));
        })
        .catch(err => {
            res.json(jsonHelper.getError(err.message));
        })
};
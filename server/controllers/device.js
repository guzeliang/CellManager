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
    models.RemoteDevice.destroy({ where: { id: id } }).then(function(count) {
        res.json(jsonHelper.getSuccess('删除成功'));
    }).catch(function(err) {
        res.json(jsonHelper.getError(err.message));
    })
}
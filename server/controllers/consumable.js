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
    var deviceId = +req.query.deviceid || -1;

    var allCount = 0;

    var countSql = `SELECT DISTINCT COUNT(*) as recordCount FROM consumable  c 
    LEFT JOIN deviceunionconsumable duc ON c.id = duc.consumableId  
    WHERE  (${customerId}=-1 OR (${customerId} <> -1 AND c.customerId = ${customerId})) 
    AND ('${keyword}'='' OR ('${keyword}' <> '' AND c.name LIKE '%${keyword}%')) 
    AND (${deviceId}=-1 OR (${deviceId} <> -1 AND duc.deviceId = ${deviceId})) `;

    var querySql = `SELECT DISTINCT c.*, (SELECT SUM(times) FROM deviceunionconsumable x WHERE x.consumableId = c.id ) AS times FROM consumable  c 
    LEFT JOIN deviceunionconsumable duc ON c.id = duc.consumableId  
    WHERE  (${customerId}=-1 OR (${customerId} <> -1 AND c.customerId = ${customerId})) 
    AND ('${keyword}'='' OR ('${keyword}' <> '' AND c.name LIKE '%${keyword}%')) 
    AND (${deviceId}=-1 OR (${deviceId} <> -1 AND duc.deviceId = ${deviceId})) ORDER BY c.id limit ${firNum},${pageSize}`;

    models.db.query(countSql, { raw: true, type: 'SELECT' }).then(count => {
        allCount = count[0].recordCount;

        return models.db.query(querySql, { raw: true, type: 'SELECT' })
    }).then(docs => {
        res.json(jsonHelper.pageSuccess(docs, allCount));
    }).catch(err => {
        res.json(jsonHelper.getError(err.message));
    })
};

exports.create = function(req, res) {
    var device = req.body;
    if (device == null) {
        return res.json(jsonHelper.getError('body is empty'));
    }

    models.Consumable.create(device).then(function(doc) {
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
    models.DeviceUnionConsumable.destroy({ where: { consumableId: id } })
        .then(p => {
            return models.Consumable.destroy({ where: { id: id } });
        })
        .then(function(count) {
            res.json(jsonHelper.getSuccess('删除成功'));
        }).catch(function(err) {
            res.json(jsonHelper.getError(err.message));
        })
}
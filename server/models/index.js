var RemoteDevice = require('./remoteDevice');
var Consumable = require('./consumable');
var Customer = require('./customer');
var Member = require('./member');
var config = require('../config');

var DeviceUnionConsumable = require('./deviceUnionConsumable');

var db = require('./db');
var rootdb = require('./rootdb');

rootdb.query(`CREATE DATABASE IF NOT EXISTS ${config.DB.database} CHARSET utf8`, { raw: true })
    .then(() => {
        return db.sync();
    })
    .then(function() {
        console.log('数据库同步成功')
    }).catch(function(err) {
        console.log(err, '数据库同步失败')
    })

exports.RemoteDevice = RemoteDevice;
exports.Consumable = Consumable;
exports.Customer = Customer;
exports.Member = Member;

exports.DeviceUnionConsumable = DeviceUnionConsumable;
exports.db = db;
var RemoteDevice = require('./remoteDevice');
var Consumable = require('./consumable');
var Customer = require('./customer');
var Member = require('./member');

var DeviceUnionConsumable = require('./deviceUnionConsumable');

var db = require('./db');

db.sync().then(function() {
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
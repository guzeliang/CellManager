var config = require('../config');
var fs = require('fs');
var request = require('request');
var jsonHelper = require('../utils/jsonHelper');
var _ = require('underscore');
var moment = require('moment');
var models = require('../models');

exports.login = function(req, res, next) {
    var name = req.query.name;
    var password = req.query.password;

    if (!name) {
        return res.json(jsonHelper.getError('name is empty'));
    }

    if (!password) {
        return res.json(jsonHelper.getError('password is empty'));
    }

    models.Member.findOne({ where: { name: name, password: password } }).then(doc => {
        if (!doc) throw new Error('name or password is error');

        res.cookie('name', name);
        res.cookie('password', password);
        res.json(jsonHelper.getSuccess(doc));
    }).catch(err => {
        res.json(jsonHelper.getError(err.message));
    })
};

exports.singup = function(req, res) {
    var member = req.body;
    if (member == null) {
        return res.json(jsonHelper.getError('body is empty'));
    }

    if (!member.name) {
        return res.json(jsonHelper.getError('name is empty'));
    }

    if (!member.password) {
        return res.json(jsonHelper.getError('password is empty'));
    }

    models.Member.findOne({ where: { name: member.name } }).then(doc => {
        console.log(doc);
        if (doc) throw new Error('name is exist');

        return models.Member.create(member);
    }).then(doc => {
        res.cookie('name', member.name);
        res.cookie('password', member.password);
        res.json(jsonHelper.getSuccess(doc));
    }).catch(err => {
        res.json(jsonHelper.getError(err.message));
    })
}

exports.singout = function(req, res) {
    res.clearCookie('name');
    res.clearCookie('password');

    res.json(jsonHelper.getSuccess('注销成功'));
}
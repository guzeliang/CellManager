var db = require('./db');
var Sequelize = require('sequelize');
var common = require('../utils/common');

var Member = db.define('member', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(100),
        defaultValue: ''
    },
    password: {
        type: Sequelize.STRING(100),
        defaultValue: ''
    },
    description: {
        type: Sequelize.STRING(100)
    },
    contact: {
        type: Sequelize.STRING(100)
    },
    address: {
        type: Sequelize.STRING(100),
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    createdAt: {
        type: Sequelize.BIGINT(13)
    }
}, {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: 'member'
});

Member.hook('beforeCreate', function(model, options, fn) {
    model.createdAt || (model.createdAt = common.getTime());
    fn(null, model);
});

module.exports = Member;
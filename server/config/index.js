var path = require('path');
var fsx = require('fs-extra');

fsx.ensureDir(path.resolve(__dirname, '../../uploads') + '/appxs')
module.exports = {
    ROOT: __dirname,
    PORT: 6007,
    FILE_DIR: path.resolve(__dirname, '../../files'),
    LOG_DIR: path.resolve(__dirname, '../../logs'),
    UPLOAD_DIR: path.resolve(__dirname, '../../uploads'),
    APPX_DIR: path.resolve(__dirname, '../../uploads') + '/appxs',
    DB: {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'iotserver'
    },
    SIM: {
        username: 'sdxbkj',
        password: '1X6D8G'
    },
    SIM_AUTHOR_FILE: path.resolve(__dirname, '../config') + '/simtoken'

};
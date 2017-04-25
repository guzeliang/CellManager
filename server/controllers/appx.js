var BufferHelper = require('bufferhelper');
var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');
var jsonHelper = require('../utils/jsonHelper');
var multer = require('../utils/multerHelper');
var uploadx = multer.single('uploadedfile');
var unzip = require('unzip');
var config = require('../config');
var moment = require('moment');
var _ = require('underscore');

exports.upload = function(req, res, next) {
    uploadx(req, res, function(err) {
        console.log(req.file)
        if (err) {
            return res.json(jsonHelper.getError(err.message));
        }

        var extract = unzip.Extract({ path: config.APPX_DIR });

        //解压异常处理  
        extract.on('error', function(err) {
            fs.unlinkSync(req.file.path);
            return res.json(jsonHelper.getError(err.message));
        });

        //解压完成处理  
        extract.on('finish', function() {
            res.json(jsonHelper.getSuccess("上传成功"));
        });

        fs.createReadStream(req.file.path).pipe(extract);
    });
};

exports.list = function(req, res, next) {
    fs.readdir(config.APPX_DIR, function(err, docs) {
        if (err)
            return res.json(jsonHelper.getError(err.message));

        var arr = [];
        docs.forEach(function(each) {
            var fileState = fs.statSync(config.APPX_DIR + "/" + each);
            if (fileState.isDirectory()) {
                arr.push({
                    name: each,
                    createTime: moment(fileState.ctime).format('YYYY-MM-DD HH:mm:ss'),
                });
            }
        })


        res.json(jsonHelper.getSuccess(arr));
    });
};

exports.remove = function(req, res, next) {
    try {
        if (fs.existsSync(config.APPX_DIR + '/' + req.params.name + '.zip'))
            fs.unlinkSync(config.APPX_DIR + '/' + req.params.name + '.zip');
        deleteFolderRecursive(config.APPX_DIR + '/' + req.params.name);
        res.json(jsonHelper.getSuccess('删除成功'));
    } catch (e) {
        res.json(jsonHelper.getError(e.message));
    }
};

function deleteFolderRecursive(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

exports.getLastVersion = function(req, res, next) {
    fs.readdir(config.APPX_DIR, function(err, docs) {
        if (err)
            return res.json(jsonHelper.getError(err.message));

        var vers = [];

        docs.forEach(each => {
            var arr = each.split('_');
            var fileState = fs.statSync(config.APPX_DIR + "/" + each);
            if (arr.length > 2 && arr[1].split('.').length == 4 && fileState.isDirectory()) {
                var verArr = arr[1].split('.');

                vers.push({
                    fullname: each,
                    name: arr[0],
                    version: verArr[0] * 1000000 + verArr[1] * 10000 + verArr[2] * 100 + verArr[3] * 1,
                    type: arr.length == 3 ? '' : arr[2]
                });
            }
        })

        var x = _.sortBy(vers, 'version');
        if (!x || x.length == 0) {
            return res.json(jsonHelper.getError('文件不存在'));
        }
        var f = x.pop();

        fs.readdir(config.APPX_DIR + '/' + f.fullname, (err, docs) => {
            if (err)
                return res.json(jsonHelper.getError(err.message));
            var t = _.find(docs, each => each.indexOf('.appxbundle') != -1);
            if (!t)
                return res.json(jsonHelper.getError('文件不存在'));

            res.json(jsonHelper.getSuccess({ ver: f.version, path: 'appxs/' + f.fullname + '/' + t }));
        });

    });
};
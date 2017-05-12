var path = require('path');

module.exports = function(app) {
    var routers = [
        '/appx',
        '/login*',
        '/devices*',
        '/customers*',
        '/consumables*',
    ];

    app.get(routers, function(req, res) {
        res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
    })

    app.use(require('./account'));
    app.use(require('./device'));
    app.use(require('./customer'));
    app.use(require('./consumable'));
    app.use(require('./appx'));
    app.use(require('./sim'));

};
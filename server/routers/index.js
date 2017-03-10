var path = require('path');

module.exports = function(app) {
    var routers = [
        '/devices',
        '/customers',
        '/consumables',
    ];

    app.get(routers, function(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'index.html'));
    })

    app.use(require('./device'));
    app.use(require('./customer'));
    app.use(require('./consumable'));

};
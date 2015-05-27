var Item = require('./models/item');
var controller = require('./controllers/item.controller');

module.exports = function(app) {

    app.get('/api/items', controller.get);

    app.post('/api/items', controller.post);

    app.delete('/api/items/:item_id', controller.delete);

    app.get('*', function(req, res) {
        res.sendFile('./public/index.html');
    });
};

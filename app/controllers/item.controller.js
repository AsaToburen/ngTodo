var Item = require('../models/item');

module.exports.get = function(req, res) {
  Item.find(function(err, items) {
    if (err)
      res.send(err);
    res.json(items);
  });
};

module.exports.post = function(req, res) {
  Item.create({
    text: req.body.text,
    done: false
  }, function(err, item) {
    if (err)
      res.send(err);
    Item.find(function(err, items) {
      if (err)
        res.send(err);
      res.json(items);
    });
  });
};

module.exports.delete = function(req, res) {
    Item.remove({
      _id: req.params.item_id
    }, function(err, item) {
      if (err)
        res.send(err);

      Item.find(function(err, items) {
        if (err)
          res.send(err);
        res.json(items);
      });
    });
  };
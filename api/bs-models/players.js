'use strict';

var Bookshelf = require('./bookshelf'),
    Player = require('./player'),
    findMany = require('./helpers/findMany');

module.exports = Bookshelf.Collection.extend({
    model: Player,
    relationNames: Player.relationNames,
    findMany: function (ids) {
        return findMany(ids);
    }
});

'use strict';

var Bookshelf = require('./bookshelf'),
    Player = require('./player'),
    findMany = require('../helpers/findMany'),
    findQuery = require('../helpers/findQuery');

module.exports = Bookshelf.Collection.extend({
    model: Player,
    relationNames: Player.relationNames,
    findMany: function (ids) {
        return findMany(ids);
    },
    findQuery: function (queryParams) {
        return findQuery(queryParams);
    }
});

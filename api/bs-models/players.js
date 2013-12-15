'use strict';

var Bookshelf = require('./bookshelf'),
    Player = require('./player'),
    relations = Player.forge().getRelationNames(),
    findMany = require('../helpers/findMany'),
    findQuery = require('../helpers/findQuery');

module.exports = Bookshelf.Collection.extend({
    model: Player,
    findMany: function (ids) {
        return findMany(this, relations, ids);
    },
    findQuery: function (queryParams) {
        return findQuery(this, relations, queryParams);
    }
});

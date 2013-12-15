'use strict';

var Bookshelf = require('./bookshelf'),
    Lobby = require('./lobby'),
    relations = require('./relations').lobby,
    findMany = require('../helpers/findMany'),
    findQuery = require('../helpers/findQuery');

module.exports = Bookshelf.Collection.extend({
    model: Lobby,
    findMany: function (ids) {
        return findMany(this, relations, ids);
    },
    findQuery: function (queryParams) {
        return findQuery(this, relations, queryParams);
    }
});

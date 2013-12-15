'use strict';

var Bookshelf = require('./bookshelf'),
    Lobby = require('./lobby'),
    findMany = require('../helpers/findMany'),
    findQuery = require('../helpers/findQuery');

module.exports = Bookshelf.Collection.extend({
    model: Lobby,
    relationNames: Lobby.relationNames,
    findMany: function (ids) {
        return findMany(ids);
    },
    findQuery: function (queryParams) {
        return findQuery(queryParams);
    }
});

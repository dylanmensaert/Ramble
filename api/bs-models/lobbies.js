'use strict';

var db = require('./db'),
    Lobby = require('./lobby'),
    relations = require('./relations').lobby,
    findMany = require('../helpers/findMany'),
    findQuery = require('../helpers/findQuery');

module.exports = db.Collection.extend({
    model: Lobby,
    findMany: function (ids) {
        return findMany(this, relations, ids);
    },
    findQuery: function (queryParams) {
        return findQuery(this, relations, queryParams);
    }
});

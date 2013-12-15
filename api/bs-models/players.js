'use strict';

var db = require('./db'),
    Player = require('./player'),
    relations = require('./relations').player,
    findMany = require('../helpers/findMany'),
    findQuery = require('../helpers/findQuery');

module.exports = db.Collection.extend({
    model: Player,
    findMany: function (ids) {
        return findMany(this, relations, ids);
    },
    findQuery: function (queryParams) {
        return findQuery(this, relations, queryParams);
    }
});

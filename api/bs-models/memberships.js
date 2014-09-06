'use strict';

var db = require('./db'),
    Membership = require('./membership'),
    relations = require('./relations').membership,
    findMany = require('../helpers/findMany'),
    findQuery = require('../helpers/findQuery');

module.exports = db.Collection.extend({
    model: Membership,
    findMany: function(ids) {
        return findMany(this, relations, ids);
    },
    findQuery: function(queryParams) {
        return findQuery(this, relations, queryParams);
    }
});

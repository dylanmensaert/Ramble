'use strict';

var db = require('./db'),
    relationships = require('./relationships'),
    findMany = require('../helpers/findMany'),
    findQuery = require('../helpers/findQuery');

module.exports = db.Collection.extend({
    findMany: function(ids) {
        var relations = relationships.get(this.tableName());

        return findMany(this, relations, ids);
    },
    findQuery: function(queryParams) {
        var relations = relationships.get(this.tableName());

        return findQuery(this, relations, queryParams);
    }
});

'use strict';

var db = require('../db'),
    relationships = require('../relationships'),
    findQuery = require('../helpers/findQuery');

module.exports = db.Collection.extend({
    findQuery: function(queryParams) {
        var relations = relationships.get(this.tableName());

        return findQuery(this, relations, queryParams);
    }
});

/* jshint camelcase: false */
'use strict';

var db = require('./db'),
    relationships = require('./relationships');

module.exports = db.Model.extend({
    toJSON: function() {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

        delete model.password;

        return model;
    },
    fetchWithRelated: function() {
        var relations = relationships.get(this.tableName);

        return this.fetch({
            withRelated: relations
        });
    }
});

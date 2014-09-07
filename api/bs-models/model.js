/* jshint camelcase: false */
'use strict';

var db = require('./db'),
    relationships = require('./relationships'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

module.exports = db.Model.extend({
    initialize: function() {
        this.on('saving', this.hashPassword);
    },
    hasTimestamps: ['createdAt', 'updatedAt'],
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
    },
    hashPassword: function() {
        return setHashedPassword(this.attributes);
    },
    verifyPassword: function(password) {
        return verifyPassword(password, this.attributes.password);
    }
});

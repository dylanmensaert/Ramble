/* jshint camelcase: false */
'use strict';

var db = require('./db'),
    Model,
    relationships = require('./relationships'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

Model = db.Model.extend({
    initialize: function() {
        this.on('saving', this.hashPassword);

        // TODO: Find another way to implement this instead of events?
        // Cannot use toJSON delete since this is getting used by Field validation.
        this.on('saved', this.unsetFields);
        this.on('destroyed', this.unsetFields);
        this.on('fetched', this.unsetFields);
    },
    hasTimestamps: ['createdAt', 'updatedAt'],
    unsetFields: function() {
        this.unset('password', {
            silent: true
        });
    },
    toJSON: function() {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

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

module.exports = Model;

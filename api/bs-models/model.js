/* jshint camelcase: false */
'use strict';

var db = require('./db'),
    Model,
    relationships = require('./relationships'),
    toUnderscore = require('../helpers/toUnderscore'),
    toCamelCase = require('../helpers/toCamelCase'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

// TODO: Implement password functionality as mixin into correct objects.
Model = db.Model.extend({
    initialize: function() {
        this.on('saving', this.hashPassword);

        // TODO: Find another way to implement this instead of events?
        // Cannot use toJSON delete since this is getting used by Field validation.
        // Update: Cannot implement this as such since password authentication will not work.
        // this.on('saved', this.unsetFields);
        // this.on('destroyed', this.unsetFields);
        // this.on('fetched', this.unsetFields);
    },
    hasTimestamps: true,
    // unsetFields: function() {
    //     this.unset('password', {
    //         silent: true
    //     });
    // },
    toJSON: function(options) {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

        if (!options.validating) {
            delete model.password;
        }

        return toCamelCase(model);
    },
    format: function(attributes) {
        return toUnderscore(attributes);
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

/* jshint camelcase: false */
'use strict';

var db = require('../db'),
    Model,
    relationships = require('../relationships'),
    toUnderscore = require('../helpers/toUnderscore'),
    toCamelCase = require('../helpers/toCamelCase'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword'),
    isValidating;

isValidating = function(options) {
    return options && options.validating;
};

// TODO: Implement password functionality as mixin into correct objects.
Model = db.Model.extend({
    initialize: function() {
        this.on('saving', this.hashPassword);
    },
    hasTimestamps: true,
    toJSON: function(options) {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

        if (!isValidating(options)) {
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

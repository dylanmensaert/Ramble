/* jshint camelcase: false */
'use strict';

var db = require('../db'),
    Model,
    relationships = require('../relationships'),
    toUnderscore = require('../helpers/toUnderscore'),
    toCamelCase = require('../helpers/toCamelCase'),
    events = require('./events'),
    verifyPassword = require('../helpers/verifyPassword');

// TODO: Implement password functionality as mixin into correct objects.
Model = db.Model.extend({
    initialize: function() {
        events.init(this);
    },
    hasTimestamps: true,
    toJSON: function(options) {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

        if (!options.validating) {
            delete model.password;
        }

        if (!options.withRelated) {
            model = toCamelCase(model);
        }

        return model;
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
    verifyPassword: function(password) {
        return verifyPassword(password, this.attributes.password);
    }
});

module.exports = Model;

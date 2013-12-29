'use strict';

var db = require('./db'),
    lobby,
    player,
    toUnderscore = require('../helpers/toUnderscore'),
    toCamelCase = require('../helpers/toCamelCase'),
    relations = require('./relations').membership;

module.exports = db.Model.extend({
    tableName: 'memberships',
    toJSON: function() {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

        return toUnderscore(model);
    },
    format: function(attrs) {
        return toCamelCase(attrs);
    },
    lobby: function() {
        return this.belongsTo(lobby);
    },
    player: function() {
        return this.belongsTo(player);
    },
    fetchWithRelated: function() {
        return this.fetch({withRelated: relations});
    }
});

lobby = require('./lobby');
player = require('./player');

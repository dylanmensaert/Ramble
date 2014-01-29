/* jshint camelcase: false */
'use strict';

var db = require('./db'),
    Fields = require('bookshelf-fields'),
    Membership,
    Lobby,
    Player,
    relations = require('./relations').membership,
    toUnderscore = require('../helpers/toUnderscore'),
    toCamelCase = require('../helpers/toCamelCase');

Membership = db.Model.extend({
    tableName: 'memberships',
    toJSON: function() {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

        return toUnderscore(model);
    },
    format: function(attrs) {
        return toCamelCase(attrs);
    },
    lobby: function() {
        return this.belongsTo(Lobby);
    },
    player: function() {
        return this.belongsTo(Player);
    },
    fetchWithRelated: function() {
        return this.fetch({
            withRelated: relations
        });
    }
});

Fields.enable_validation(Membership);

Fields.fields(Membership, [
    Fields.IntField, 'lobby_id', {
        required: true
    }
], [
    Fields.IntField, 'player_id', {
        required: true
    }
]);

module.exports = Membership;

Lobby = require('./lobby');
Player = require('./player');

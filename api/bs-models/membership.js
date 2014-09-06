/* jshint camelcase: false */
'use strict';

var Model = require('./model'),
    Fields = require('bookshelf-fields'),
    Membership,
    Lobby,
    Player,
    relations = require('./relations').membership;

Membership = Model.extend({
    tableName: 'memberships',
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

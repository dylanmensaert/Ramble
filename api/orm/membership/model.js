/* jshint camelcase: false */
'use strict';

var Model = require('../components/model'),
    Fields = require('bookshelf-fields'),
    Membership,
    Lobby,
    Player;

Membership = Model.extend({
    tableName: 'memberships',
    lobby: function() {
        return this.belongsTo(Lobby);
    },
    player: function() {
        return this.belongsTo(Player);
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

Lobby = require('../lobby/model');
Player = require('../player/model');

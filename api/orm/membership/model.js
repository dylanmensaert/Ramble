/* jshint camelcase: false */
'use strict';

var Model = require('../components/model'),
    Fields = require('bookshelf-fields'),
    events = require('./events'),
    Membership,
    Lobby,
    Player;

Membership = Model.extend({
    tableName: 'memberships',
    initialize: function() {
        Model.prototype.initialize.apply(this, arguments);

        events.init(this);
    },
    lobby: function() {
        return this.belongsTo(Lobby);
    },
    player: function() {
        return this.belongsTo(Player);
    }
});

Fields.enable_validation(Membership);

Fields.fields(Membership, [
    Fields.IntField, 'lobbyId', {
        required: true
    }
], [
    Fields.IntField, 'playerId', {
        required: true
    }
]);

module.exports = Membership;

Lobby = require('../lobby/model');
Player = require('../player/model');

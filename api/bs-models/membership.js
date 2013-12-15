'use strict';

var db = require('./db'),
    lobby,
    player;

module.exports = db.Model.extend({
    tableName: 'memberships',
    lobby: function () {
        return this.belongsTo(lobby);
    },
    player: function () {
        return this.belongsTo(player);
    }
});

lobby = require('./lobby');
player = require('./player');

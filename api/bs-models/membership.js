'use strict';

var db = require('./db'),
    lobby,
    player,
    relations = require('./relations').membership;

module.exports = db.Model.extend({
    tableName: 'memberships',
    lobby: function () {
        return this.belongsTo(lobby);
    },
    player: function () {
        return this.belongsTo(player);
    },
    fetchWithRelated: function () {
        return this.fetch({withRelated: relations});
    }
});

lobby = require('./lobby');
player = require('./player');

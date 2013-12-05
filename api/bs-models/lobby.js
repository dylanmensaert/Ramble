'use strict';

var PG = require('./pg'),
    Playerbs = require('./player'),
    Lobbybs;

Lobbybs = PG.Model.extend({
    tableName: 'lobbies',
    //TODO: Don't include attributes (columns), must do validation on our own though.
    title: null,
    password: null,
    maxMembers: null,
    owner: function () {
        return this.belongsTo(Playerbs);
    },
    members: function () {
        return this.belongsToMany(Playerbs);
    }
});

module.exports = Lobbybs;

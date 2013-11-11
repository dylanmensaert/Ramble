'use strict';

var PG = require('./pg'),
    Lobbybs = require('./lobby'),
    Playerbs;

Playerbs = PG.Model.extend({
    tableName: 'players',
    username: null,
    password: null,
    email: null,
    ownedLobbies: function () {
        return this.hasMany(Lobbybs);
    },
    joinedLobbies: function () {
        return this.belongsToMany(Lobbybs);
    }
});

module.exports = Playerbs;

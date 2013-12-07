'use strict';

var PG = require('./pg');
//TODO: lobby = require('./lobby');

module.exports = PG.Model.extend({
    tableName: 'players',
    username: null,
    password: null,
    email: null,
    ownedLobbies: function () {
        return this.hasMany(require('./lobby'), 'owner');
    },
    joinedLobbies: function () {
        return this.belongsToMany(require('./lobby'));
    }
});

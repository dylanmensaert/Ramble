'use strict';

var Bookshelf = require('./bookshelf');
//TODO: lobby = require('./lobby');

module.exports = Bookshelf.Model.extend({
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

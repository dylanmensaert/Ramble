'use strict';

var db = require('./db'),
    lobby,
    membership,
    relations = require('./relations').player,
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

module.exports = db.Model.extend({
    tableName: 'players',
    username: null,
    password: null,
    email: null,
    ownedLobbies: function () {
        return this.hasMany(lobby, 'owner_id');
    },
    joinedLobbies: function () {
        return this.belongsToMany(lobby).through(membership);
    },
    fetchWithRelated: function () {
        return this.fetch({withRelated: relations});
    },
    hashPassword: function () {
        return setHashedPassword(this.attributes);
    },
    verifyPassword: function (password) {
        return verifyPassword(password, this.toJSON().password);
    }
});

lobby = require('./lobby');
membership = require('./membership');

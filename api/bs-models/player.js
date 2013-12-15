'use strict';

var Bookshelf = require('./bookshelf'),
    relations = require('./relations').player,
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

module.exports = Bookshelf.Model.extend({
    tableName: 'players',
    username: null,
    password: null,
    email: null,
    ownedLobbies: function () {
        return this.hasMany(require('./lobby'), 'owner_id');
    },
    joinedLobbies: function () {
        return this.belongsToMany(require('./lobby')).through(require('./membership'));
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

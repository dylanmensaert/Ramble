'use strict';

var Bookshelf = require('./bookshelf'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

module.exports = Bookshelf.Model.extend({
    tableName: 'players',
    relationNames: ['ownedLobbies', 'joinedLobbies'],
    username: null,
    password: null,
    email: null,
    ownedLobbies: function () {
        return this.hasMany(require('./lobby'), 'owner');
    },
    joinedLobbies: function () {
        return this.belongsToMany(require('./lobby')).through(require('./membership'));
    },
    hashPassword: function () {
        return setHashedPassword(this.attributes);
    },
    verifyPassword: function (password) {
        return verifyPassword(password, this.toJSON().password);
    }
});

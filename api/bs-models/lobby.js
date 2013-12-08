'use strict';

var Bookshelf = require('./bookshelf'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');
//TODO: player = require('./player');

module.exports = Bookshelf.Model.extend({
    tableName: 'lobbies',
    //TODO: Don't include attributes (columns), must do validation on our own though.
    title: null,
    password: null,
    maxMembers: null,
    owner: function () {
        return this.belongsTo(require('./player'));
    },
    members: function () {
        return this.belongsToMany(require('./player'));
    },
    hashPassword: function () {
        return setHashedPassword(this.attributes);
    },
    verifyPassword: function (password) {
        return verifyPassword(password, this.toJSON().password);
    }
});

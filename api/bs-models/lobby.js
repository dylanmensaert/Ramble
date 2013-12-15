'use strict';

var Bookshelf = require('./bookshelf'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

module.exports = Bookshelf.Model.extend({
    tableName: 'lobbies',
    title: null,
    password: null,
    maxMembers: null,
    owner: function () {
        return this.belongsTo(require('./player'), 'owner_id');
    },
    members: function () {
        return this.belongsToMany(require('./player')).through(require('./membership'));
    },
    hashPassword: function () {
        return setHashedPassword(this.attributes);
    },
    verifyPassword: function (password) {
        return verifyPassword(password, this.toJSON().password);
    }
});

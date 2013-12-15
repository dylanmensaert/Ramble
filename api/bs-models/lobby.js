'use strict';

var db = require('./db'),
    relations = require('./relations').lobby,
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

module.exports = db.Model.extend({
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

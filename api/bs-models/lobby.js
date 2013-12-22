'use strict';

var db = require('./db'),
    player,
    membership,
    relations = require('./relations').lobby,
    toUnderscore = require('../helpers/toUnderscore'),
    toCamelCase = require('../helpers/toCamelCase'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

module.exports = db.Model.extend({
    tableName: 'lobbies',
    title: null,
    password: null,
    maxMembers: null,
    toJSON: function () {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

        return toUnderscore(model);
    },
    format: function (attrs) {
        return toCamelCase(attrs);
    },
    owner: function () {
        return this.belongsTo(player, 'owner_id');
    },
    members: function () {
        return this.belongsToMany(player).through(membership);
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

player = require('./player');
membership = require('./membership');

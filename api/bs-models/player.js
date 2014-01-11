'use strict';

var db = require('./db'),
    lobby,
    membership,
    relations = require('./relations').player,
    toUnderscore = require('../helpers/toUnderscore'),
    toCamelCase = require('../helpers/toCamelCase'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword');

module.exports = db.Model.extend({
    tableName: 'players',
    username: null,
    password: null,
    email: null,
    toJSON: function() {
        var model = db.Model.prototype.toJSON.apply(this, arguments);

        delete model.password;

        return toUnderscore(model);
    },
    format: function(attrs) {
        return toCamelCase(attrs);
    },
    ownedLobbies: function() {
        return this.hasMany(lobby, 'owner_id');
    },
    joinedLobbies: function() {
        return this.belongsToMany(lobby).through(membership);
    },
    fetchWithRelated: function() {
        return this.fetch({
            withRelated: relations
        });
    },
    hashPassword: function() {
        return setHashedPassword(this.attributes);
    },
    verifyPassword: function(password) {
        return verifyPassword(password, this.attributes.password);
    }
});

lobby = require('./lobby');
membership = require('./membership');

/* jshint camelcase: false */
'use strict';

var db = require('./db'),
    lobby,
    membership,
    relations = require('./relations').player,
    toUnderscore = require('../helpers/toUnderscore'),
    toCamelCase = require('../helpers/toCamelCase'),
    setHashedPassword = require('../helpers/setHashedPassword'),
    verifyPassword = require('../helpers/verifyPassword'),
    Fields = require('bookshelf-fields'),
    Player;

db.plugin(Fields.plugin);

Player = db.Model.extend({
    tableName: 'players',
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

Fields.enable_validation(Player);

Fields.fields(Player, [
    Fields.StringField, 'username', {
        required: true
    }, {
        max_length: 50
    }
], [
    Fields.StringField, 'password', {
        required: true
    }
], [
    Fields.EmailField, 'email', {
        required: true
    }, {
        max_length: 50
    }
]);

module.exports = Player;

lobby = require('./lobby');
membership = require('./membership');

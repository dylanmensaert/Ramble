'use strict';

var PG = require('./pg');
//TODO: player = require('./player');

module.exports = PG.Model.extend({
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
    }
});


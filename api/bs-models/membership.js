'use strict';

var db = require('./db');
//TODO: can't use variable because of cyclic dependency
// player = require('./player');

module.exports = db.Model.extend({
    tableName: 'memberships',
    lobby: function () {
        return this.belongsTo(require('./lobby'));
    },
    player: function () {
        return this.belongsTo(require('./player'));
    }
});

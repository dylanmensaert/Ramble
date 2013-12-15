'use strict';

var Bookshelf = require('./bookshelf'),
    Lobby = require('./lobby'),
    findMany = require('./helpers/findMany');

module.exports = Bookshelf.Collection.extend({
    model: Lobby,
    relationNames: Lobby.relationNames,
    findMany: function (ids) {
        return findMany(ids);
    }
});

'use strict';

var Bookshelf = require('./bookshelf'),
    Lobby = require('./lobby'),
    relations = Lobby.relationNames;

module.exports = Bookshelf.Collection.extend({
    model: Lobby,
    findMany: function (ids) {
        return this.query().whereIn(ids).then(function (lobbies) {
            this.add(lobbies);

            return this.load(relations);
        }.bind(this));
    }
});

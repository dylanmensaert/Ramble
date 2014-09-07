'use strict';

var Collection = require('./collection'),
    Lobby = require('./lobby');

module.exports = Collection.extend({
    model: Lobby
});

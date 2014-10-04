'use strict';

var Collection = require('../components/collection'),
    Lobby = require('./model');

module.exports = Collection.extend({
    model: Lobby
});

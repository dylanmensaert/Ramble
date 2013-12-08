'use strict';

//TODO: Rename "bs-models" folder to just "models" once sails allows it
var Bookshelf = require('bookshelf'),
    connection = require('./connection');

module.exports = Bookshelf.initialize({
    debug: true,
    client: 'pg',
    connection: connection
});

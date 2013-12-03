'use strict';

var Bookshelf = require('bookshelf'),
    connection = require('./connection'),
    PG;

PG = Bookshelf.initialize({
    debug: true,
    client: 'pg',
    connection: connection
});

module.exports = PG;

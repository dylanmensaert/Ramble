'use strict';

var Bookshelf = require('bookshelf'),
    connection = require('./connection');

module.exports = Bookshelf.initialize({
    debug: true,
    client: 'pg',
    connection: connection
});

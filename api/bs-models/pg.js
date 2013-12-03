'use strict';

var Bookshelf = require('bookshelf'),
    PG;

PG = Bookshelf.initialize({
    debug: true,
    client: 'postgres',
    connection: {
        //TODO: Put this info in a separate file, not included in git
        host: 'localhost',
        user: 'postgres',
        password: 'toor',
        database: 'ramble',
        charset: 'utf8'
    }
});

module.exports = PG;

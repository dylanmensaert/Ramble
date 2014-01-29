'use strict';

//TODO: Rename "bs-models" folder to just "models" once sails allows it
var Bookshelf = require('bookshelf'),
    Fields = require('bookshelf-fields'),
    db,
    connection = require('./connection');

db = Bookshelf.initialize({
    debug: true,
    client: 'pg',
    connection: connection
});

db.plugin(Fields.plugin);

module.exports = db;

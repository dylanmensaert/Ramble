'use strict';

// TODO: Rename "bs-models" folder to just "models" once sails allows it
var createBookshelf = require('bookshelf'),
    createKnex = require('knex'),
    Fields = require('bookshelf-fields'),
    connection = require('./connection'),
    knex,
    db;

knex = createKnex({
    debug: true,
    client: 'pg',
    connection: connection
});

db = createBookshelf(knex);

db.plugin(Fields.plugin());

module.exports = db;

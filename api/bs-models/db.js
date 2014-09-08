'use strict';

// TODO: Rename "bs-models" folder to just "models" once sails allows it
var Bookshelf = require('bookshelf'),
    Knex = require('knex'),
    Fields = require('bookshelf-fields'),
    connection = require('./connection'),
    knex,
    db;

knex = Knex({
    debug: true,
    client: 'pg',
    connection: connection
});

db = Bookshelf(knex);

db.plugin(Fields.plugin);

module.exports = db;

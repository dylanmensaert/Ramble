'use strict';

module.exports.adapters = {
    'default': 'disk',
    //TODO: For development only..will change to Postgres + Bookshelf
    disk: {
        module: 'sails-disk'
    }
};

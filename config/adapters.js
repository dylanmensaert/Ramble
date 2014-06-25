'use strict';

module.exports.adapters = {
    default: 'disk',
    // TODO: For development only..changed to Postgres + Bookshelf
    disk: {
        module: 'sails-disk'
    }
};

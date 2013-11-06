'use strict';

module.exports.adapters = {
    'default': 'disk',
    //TODO: For development only..will change to Mongoose + MongoDB
    disk: {
        module: 'sails-disk'
    }
};

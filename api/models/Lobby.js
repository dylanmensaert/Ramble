'use strict';

module.exports = {
    schema: true,
    attributes: {
        title: {
            type: 'STRING',
            required: true,
            maxLength: 50
        },
        //TODO: modify password like Player-model
        password: {
            type: 'STRING',
            required: true
        },
        maxMembers: {
            type: 'INTEGER',
            required: true,
            numeric: true
        },
        //TODO: Use association.. (Mongoose)
        owner: {
            type: 'STRING'
            //TODO: Temp fix for creating lobbies, because ID isn't set client-side anymore
            //required: true
        },
        members: {
            type: 'ARRAY'
        }
    }
};

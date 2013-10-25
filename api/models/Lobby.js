'use strict';

module.exports = {
    schema: true,
    attributes: {
        title: {
            type: 'STRING',
            required: true,
            maxLength: 50
        },
        //TODO: modify password
        password: {
            type: 'STRING',
            required: true
        },
        maxMembers: {
            type: 'INTEGER',
            required: true,
            numeric: true
        },
        owner: {
            //TODO: Should type be integer (ID) or string?
            type: 'INTEGER'
            //TODO: Temp fix for creating lobbies, because ID isn't set client-side anymore
            //required: true
        },
        members: {
            type: 'ARRAY'
        }
    }
};

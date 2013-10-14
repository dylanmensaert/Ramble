'use strict';

/**
 * Lobby
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

    schema: true,

    attributes: {
        title: {
            type: 'STRING',
            required: true,
            maxLength: 50
        },
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
            type: 'INTEGER',
            required: true
        },
        members: {
            type: 'ARRAY'
        }
    }
};

'use strict';

/**
 * Player
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {
    attributes: {
        username: {
            type: 'STRING',
            required: true,
            maxLength: 50
        },
        password: {
            type: 'STRING',
            required: true,
            maxLength: 50
        },
        email: {
            type: 'EMAIL',
            required: true,
            maxLength: 50
        },
        //TODO: Should these be defined? Are based off Lobby.owner and Lobby.members
        ownedLobbies: {
            type: 'ARRAY'
        },
        joinedLobbies: {
            type: 'ARRAY'
        }
    }
};

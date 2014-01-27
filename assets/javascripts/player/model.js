define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        EmberValidations = require('ember-validations');

    return DS.Model.extend(EmberValidations.Mixin, {
        username: DS.attr('string'),
        password: DS.attr('string'),
        email: DS.attr('string'),
        ownedLobbies: DS.hasMany('lobby', {
            inverse: 'owner'
        }),
        joinedLobbies: DS.hasMany('lobby', {
            inverse: 'members'
        }),
        validations: {
            username: {
                presence: true,
                length: {
                    maximum: 50
                }
            },
            password: {
                presence: true,
                confirmation: true
            },
            email: {
                presence: true,
                length: {
                    maximum: 50
                },
                format: {
                    //TODO: This line prevents from adding - "disallowKeywords": ["with"] - in the .jscs.json.
                    with: /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,6}$/i
                }
            },
            ownedLobbies: {

            },
            joinedLobbies: {

            }
        }
    });
});

define(function (require) {
    'use strict';

    var DS = require('ember-data'),
        EmberValidations = require('ember-validations');

    return DS.Model.extend(EmberValidations.Mixin, {
        title: DS.attr('string'),
        password: DS.attr('string'),
        maxMembers: DS.attr('number'),
        owner: DS.belongsTo('player', {
            inverse: 'ownedLobbies'
        }),
        members: DS.hasMany('player', {
            inverse: 'joinedLobbies'
        }),
        validations: {
            title: {
                presence: true,
                length: {
                    maximum: 50
                }
            },
            password: {
                presence: true,
                confirmation: true
            },
            maxMembers: {
                numericality: {
                    onlyInteger: true
                }
            },
            owner: {

            },
            members: {

            }
        }
    });
});

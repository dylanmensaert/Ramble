define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        EmberValidations = require('ember-validations');

    return DS.Model.extend(EmberValidations.Mixin, {
        name: DS.attr('string'),
        password: DS.attr('string'),
        email: DS.attr('string'),
        memberships: DS.hasMany('membership', {
            async: true
        }),
        membershipsOfTypeHost: function() {
            return this.get('memberships.[]').filterBy('data.type', 'host');
        }.property('memberships.@each.type'),
        membershipsOfTypeParticipant: function() {
            return this.get('memberships.[]').filterBy('data.type', 'participant');
        }.property('memberships.@each'),
        validations: {
            name: {
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
                    // TODO: This line prevents from adding - "disallowKeywords": ["with"] - in the .jscsrc.
                    with: /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,6}$/i
                }
            },
            memberships: {

            }
        }
    });
});

define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        Model = require('components/model');

    return Model.extend({
        title: DS.attr('string'),
        password: DS.attr('string'),
        maxMembers: DS.attr('number'),
        memberships: DS.hasMany('membership', {
            async: true
        }),
        membershipOfTypeHost: function() {
            return this.get('memberships').findBy('type', 'host');
        }.property('memberships.@each.type'),
        membershipsOfTypeParticipant: function() {
            return this.get('memberships').filterBy('type', 'participant');
        }.property('memberships.@each.type'),
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
                // TODO: https://github.com/dockyard/ember-validations/issues/124
                // numericality: {
                //     onlyInteger: true
                // }
            },
            memberships: {

            }
        }
    });
});

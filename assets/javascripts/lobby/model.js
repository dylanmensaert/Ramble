define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        EmberValidations = require('ember-validations');

    return DS.Model.extend(EmberValidations.Mixin, {
        title: DS.attr('string'),
        password: DS.attr('string'),
        maxMembers: DS.attr('number'),
        ownership: DS.belongsTo('membership', {
            async: true
        }),
        memberships: DS.hasMany('membership', {
            async: true
        }),
        currentMembers: function() {
            return this.get('memberships.length') + 1;
        }.property('memberships.length'),
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
            ownership: {

            },
            memberships: {

            }
        }
    });
});

define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        EmberValidations = require('ember-validations');

    return DS.Model.extend(EmberValidations.Mixin, {
        type: DS.attr('string'),
        player: DS.belongsTo('player', {
            async: true
        }),
        lobby: DS.belongsTo('lobby', {
            async: true
        }),
        validations: {
            player: {

            },
            lobby: {

            }
        }
    });
});

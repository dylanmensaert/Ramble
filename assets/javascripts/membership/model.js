define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        EmberValidations = require('ember-validations');

    return DS.Model.extend(EmberValidations.Mixin, {
        player: DS.belongsTo('player'),
        lobby: DS.belongsTo('lobby'),
        validations: {
            player: {

            },
            lobby: {

            }
        }
    });
});

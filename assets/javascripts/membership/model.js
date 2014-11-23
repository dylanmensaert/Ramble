define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        Model = require('components/model');

    return Model.extend({
        createdAt: DS.attr('date'),
        updatedAt: DS.attr('date'),
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

define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        EmberValidations = require('ember-validations');

    return DS.Model.extend(EmberValidations.Mixin, {
        createdAt: DS.attr('dateTime'),
        updatedAt: DS.attr('dateTime')
    });
});

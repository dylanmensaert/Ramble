define(function(require) {
    'use strict';

    var Ember = require('ember'),
        EmberValidations = require('ember-validations');

    return Ember.Object.extend(EmberValidations.Mixin, {
        name: null,
        password: null,
        validations: {
            name: {
                presence: true,
                length: {
                    maximum: 50
                }
            },
            password: {
                presence: true
            }
        }
    });
});

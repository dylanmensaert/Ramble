define(function(require) {
    'use strict';

    var Ember = require('ember'),
        EmberEasyForm = require('ember-easyform');

    return {
        config: function() {
            EmberEasyForm.Config.registerInputType('focussed_textfield', Ember.FocussedTextField);

            EmberEasyForm.Config.registerWrapper('default', {
                formClass: '',
                fieldErrorClass: 'has-error',
                inputClass: 'form-group',
                errorClass: 'help-block',
                hintClass: 'help-block',
                labelClass: 'control-label',
                wrapControls: false,
                controlsWrapperClass: ''
            });
        }
    };
});

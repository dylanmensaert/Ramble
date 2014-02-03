define(function(require) {
    'use strict';

    var Ember = require('ember'),
        EmberEasyForm = require('ember-easyform');

    require('bootstrap');

    Ember.TextSupport.reopen({
        classNames: ['form-control']
    });

    //TODO: Ember automatically binds to 'autofocus' nowadays
    Ember.FocussedTextField = Ember.TextField.extend({
        attributeBindings: ['autofocus'],
        autofocus: 'autofocus'
    });

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
});

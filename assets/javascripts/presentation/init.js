define(function(require) {
    'use strict';

    var Ember = require('ember'),
        EmberEasyForm = require('presentation/ember-easyform');

    require('bootstrap');
    require('presentation/dates');

    Ember.TextSupport.reopen({
        classNames: ['form-control']
    });

    Ember.FocussedTextField = Ember.TextField.extend({
        becomeFocused: function() {
            this.$().focus();
        }.on('didInsertElement')
    });

    EmberEasyForm.config();
});

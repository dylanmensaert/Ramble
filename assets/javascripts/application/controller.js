define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Controller.extend({
        isLoading: false,
        error: null,
        actions: {
            dismissAlert: function() {
                this.set('error', null);
            }
        }
    });
});

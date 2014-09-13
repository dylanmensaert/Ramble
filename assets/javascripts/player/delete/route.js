define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/update-title'), require('login/helpers/ownership-check'), {
        title: function() {
            return this.controller.get('name') + ' - Delete';
        }.property(),
        afterModel: function(model, transition) {
            this.checkOwnershipAndRedirect(model, transition);
        }
    });
});

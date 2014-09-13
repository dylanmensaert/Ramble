define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/update-title'), require('login/helpers/ownership-check'), require('helpers/model-rollback'), {
        title: function() {
            return this.controller.get('name') + ' - Edit';
        }.property(),
        afterModel: function(model, transition) {
            this.checkOwnershipAndRedirect(model, transition);
        },
        deactivate: function() {
            this.checkToRollbackModel();
        }
    });
});

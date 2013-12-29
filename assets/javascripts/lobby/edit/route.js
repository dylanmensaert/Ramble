define(function(require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/update-title'), require('login/helpers/ownership-check'), require('helpers/model-rollback'), {
        title: function() {
            return this.controller.get('title') + ' - Edit';
        }.property(),
        afterModel: function(model, transition) {
            this.checkOwnershipAndRedirect(model.get('owner'), transition);
        },
        deactivate: function() {
            this.checkToRollbackModel();
        }
    });
});

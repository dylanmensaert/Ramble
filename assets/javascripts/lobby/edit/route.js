define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('login/helpers/ownership-check-mixin'), require('helpers/model-rollback-mixin'), {
        title: function () {
            return this.get('controller.title') + ' - Edit';
        }.property('controller.title'),
        afterModel: function (model, transition) {
            this.checkOwnershipAndRedirect(model.get('owner'), transition);
        },
        deactivate: function () {
            this.checkToRollbackModel();
        }
    });
});

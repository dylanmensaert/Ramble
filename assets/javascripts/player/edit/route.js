define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/update-title-mixin'), require('login/helpers/ownership-check-mixin'), require('helpers/model-rollback-mixin'), {
        title: function () {
            return this.get('controller.username') + ' - Edit';
        }.property('controller.username'),
        afterModel: function (model, transition) {
            this.checkOwnershipAndRedirect(model, transition);
        },
        deactivate: function () {
            this.checkToRollbackModel();
        }
    });
});

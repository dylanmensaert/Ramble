define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('login/helpers/ownership-check-mixin'), {
        title: function () {
            return this.get('controller.username') + ' - Delete';
        }.property('controller.username'),
        afterModel: function (model, transition) {
            this.checkOwnershipAndRedirect(model, transition);
        }
    });
});

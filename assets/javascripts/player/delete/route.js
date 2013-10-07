define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/check-ownership-mixin'), {
        title: function () {
            return this.get('controller.username') + ' - Delete';
        }.property('controller.username'),
        afterModel: function (model, transition) {
            this.checkOwnershipAndRedirect(model, transition);
        }
    });
});

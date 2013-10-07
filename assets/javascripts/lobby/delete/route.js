define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/check-ownership-mixin'), {
        title: function () {
            return this.get('controller.title') + ' - Delete';
        }.property('controller.title'),
        afterModel: function (model, transition) {
            this.checkOwnershipAndRedirect(model.get('owner'), transition);
        }
    });
});

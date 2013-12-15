define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend(require('helpers/update-title-mixin'), {
        title: Ember.computed.alias('controller.username')
    });
});

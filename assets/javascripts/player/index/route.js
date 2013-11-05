define(function (require) {
    'use strict';

    var Ember = require('ember');

    return Ember.Route.extend({
        title: Ember.computed.alias('controller.username')
    });
});

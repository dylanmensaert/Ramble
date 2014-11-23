define(function(require) {
    'use strict';

    var Ember = require('ember');

    Ember.Handlebars.registerBoundHelper('calendar', function(dateTime) {
        return dateTime.calendar();
    });
});

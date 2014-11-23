define(function(require) {
    'use strict';

    var DS = require('ember-data'),
        App = require('init/app');

    DS.DateTimeTransform = require('transforms/date-time');
    App.register('transform:dateTime', DS.DateTimeTransform);
});

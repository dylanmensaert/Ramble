define(function (require) {
    'use strict';

    var Ember = require('ember'),
        App;

    App = Ember.Application.create({
        ready: function () {
            Ember.$('.my-initial-loading').remove();
        },
        LOG_TRANSITIONS: true
    });

    App.deferReadiness();

    App.ApplicationAdapter = require('init/adapter').extend({
        namespace: 'api'
    });

    return App;
});

define(function(require) {
    'use strict';

    var Ember = require('ember'),
        adapter = require('init/adapter'),
        App;

    App = Ember.Application.create({
        ready: function() {
            Ember.$('.my-loading-bar').remove();
        },
        LOG_TRANSITIONS: true
    });

    App.deferReadiness();

    App.ApplicationAdapter = adapter.extend({
        namespace: 'api'
    });

    return App;
});

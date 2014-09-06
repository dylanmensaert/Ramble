define(function(require) {
    'use strict';

    require('init/injections');

    var Ember = require('ember'),
        adapter = require('application/adapter'),
        App;

    App = Ember.Application.create({
        ready: function() {
            Ember.$('.my-loading-bar').remove();
        },
        LOG_TRANSITIONS: true
    });

    App.deferReadiness();

    App.ApplicationSerializer = require('application/serializer');
    App.ApplicationAdapter = adapter.extend({
        namespace: 'api'
    });

    return App;
});

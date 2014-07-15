/* global sails: true */
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
        LOG_TRANSITIONS: sails.config.environment === 'development'
    });

    App.deferReadiness();

    App.ApplicationAdapter = adapter.extend({
        namespace: 'api'
    });

    return App;
});

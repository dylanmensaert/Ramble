define(function (require) {
    'use strict';

    var Ember = require('ember'),
        DS = require('ember-data'),
        io = require('io'),
        socket,
        App;

    App = Ember.Application.create({
        ready: function () {
            Ember.$('.my-initial-loading').remove();
        },
        LOG_TRANSITIONS: true
    });

    App.deferReadiness();

    socket = io.connect();

    DS.SailsRESTAdapter = require('init/adapter').extend({
        namespace: 'api',
        socket: socket
    });

    App.Store = DS.Store.extend({
        adapter: 'DS/sailsREST'
    });

    return App;
});

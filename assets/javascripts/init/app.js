define(function (require) {
    'use strict';

    var Ember = require('ember'),
        DS = require('ember-data'),
        App;

    App = Ember.Application.create({
        ready: function () {
            Ember.$('.my-initial-loading').remove();
        },
        LOG_TRANSITIONS: true
    });

    App.deferReadiness();

    DS.SailsRESTSerializer = require('init/serializer');

    App.Store = DS.Store.extend({
        adapter: DS.RESTAdapter.extend({
            namespace: 'api',
            defaultSerializer: 'DS/sailsREST'
        })
    });

    return App;
});

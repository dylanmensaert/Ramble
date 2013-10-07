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

    App.Store = DS.Store.extend({
        adapter: DS.FixtureAdapter
    });

    return App;
});

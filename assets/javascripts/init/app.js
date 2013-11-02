define(function (require) {
    'use strict';

    var Ember = require('ember'),
        DS = require('ember-data'),
        io = require('io'),
        App;

    App = Ember.Application.create({
        ready: function () {
            Ember.$('.my-initial-loading').remove();
        },
        LOG_TRANSITIONS: true
    });

    App.deferReadiness();

    App.socket = io.connect();

    App.Store = DS.Store.extend({
        adapter: require('init/adapter').extend({
            namespace: 'api',
            socket: App.socket
        })
    });

    //TODO: Hack to fix this issue: https://github.com/dockyard/ember-validations/issues/26
    DS.Model.reopen({
        isValid: function (key) {
            return Ember.get(Ember.get(this, 'currentState'), key);
        }.property('currentState')
    });

    return App;
});

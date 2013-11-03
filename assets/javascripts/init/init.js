define(function (require) {
    'use strict';

    var App = require('init/app'),
        DS = require('ember-data'),
        Ember = require('ember');

    //TODO: Hack to fix this issue: https://github.com/dockyard/ember-validations/issues/26
    DS.Model.reopen({
        isValid: function (key) {
            return Ember.get(Ember.get(this, 'currentState'), key);
        }.property('currentState')
    });

    require('init/templates');
    require('init/presentation');
    require('init/session');
    require('init/socket');
    require('init/router');

    require('application/init');
    require('index/init');
    require('login/init');
    require('lobby/init');
    require('player/init');

    App.advanceReadiness();
});

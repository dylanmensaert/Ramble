define(function(require) {
    'use strict';

    var Ember = require('ember'),
        sessionInjection = require('session/injection'),
        socketInjection = require('socket/injection');

    Ember.onLoad('Ember.Application', function(Application) {
        Application.initializer(sessionInjection);

        Application.initializer(socketInjection);
    });
});

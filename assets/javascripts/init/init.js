/* jshint maxstatements: false */
define(function (require) {
    'use strict';

    var App = require('init/app');

    require('init/templates');
    require('init/presentation');
    require('init/session');
    require('init/router');

    require('application/init');
    require('index/init');
    require('login/init');
    require('lobby/init');
    require('player/init');

    require('sails-io');
    require('io').connect();

    App.advanceReadiness();
});

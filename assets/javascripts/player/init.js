define(function(require) {
    'use strict';

    var App = require('init/app');

    App.Player = require('player/model');

    App.PlayerRoute = require('player/route');
    App.PlayerController = require('player/controller');

    App.PlayerIndexRoute = require('player/index/route');
    App.PlayerIndexController = require('player/index/controller');

    App.PlayerEditRoute = require('player/edit/route');
    App.PlayerEditController = require('player/edit/controller');

    App.PlayerDeleteRoute = require('player/delete/route');
    App.PlayerDeleteController = require('player/delete/controller');

    App.PlayerListRoute = require('player/list/route');
    App.PlayerListController = require('player/list/controller');

    App.PlayerCreateRoute = require('player/create/route');
    App.PlayerCreateController = require('player/create/controller');

    App.PlayerSerializer = require('player/serializer');
});

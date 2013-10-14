define(function (require) {
    'use strict';

    var App = require('init/app');

    App.Lobby = require('lobby/model');

    App.LobbyRoute = require('lobby/route');
    App.LobbyController = require('lobby/controller');

    App.LobbyIndexRoute = require('lobby/index/route');
    App.LobbyIndexController = require('lobby/index/controller');

    App.LobbyEditRoute = require('lobby/edit/route');
    App.LobbyEditController = require('lobby/edit/controller');

    App.LobbyDeleteRoute = require('lobby/delete/route');
    App.LobbyDeleteController = require('lobby/delete/controller');

    App.LobbyListRoute = require('lobby/list/route');
    App.LobbyListController = require('lobby/list/controller');

    App.LobbyCreateRoute = require('lobby/create/route');
    App.LobbyCreateController = require('lobby/create/controller');
});

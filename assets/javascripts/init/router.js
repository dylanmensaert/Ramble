define(function(require) {
    'use strict';

    var App = require('init/app'),
        googleAnalytics = require('google-analytics'),
        config = require('init/config');

    googleAnalytics('create', config.googleAnalyticsAccount);

    App.Router.reopen({
        updateTitle: function() {
            this.send('updateTitle', []);
        }.on('didTransition')
    });

    App.Router.map(function() {
        this.resource('login');

        this.resource('player', function() {
            this.route('index', {
                path: ':player_id'
            });
            this.route('edit', {
                path: ':player_id/edit'
            });
            this.route('delete', {
                path: ':player_id/delete'
            });
            this.route('list');
            this.route('create');
        });

        this.resource('lobby', function() {
            this.route('index', {
                path: ':lobby_id'
            });
            this.route('edit', {
                path: ':lobby_id/edit'
            });
            this.route('delete', {
                path: ':lobby_id/delete'
            });
            this.route('list');
            this.route('create');
        });

        this.resource('membership', function() {
            this.route('index', {
                path: ':membership_id'
            });
            this.route('list');
        });
    });
});

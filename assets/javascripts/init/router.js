/* jshint browser: true */
define(function (require) {
    'use strict';

    var App = require('init/app'),
        googleAnalytics = require('google-analytics'),
        config = require('init/config');

    googleAnalytics('create', config.googleAnalyticsAccount);

    /*
     //TODO: use the built-in features of the new router, see: https://github.com/emberjs/ember.js/pull/2757.
     App.Router.reopen({
     didTransition: function (infos) {
     this._super(infos);

     var titleList = [],
     title,
     documentTitle,
     index;

     for (index = 0; index < infos.length; index += 1) {
     title = infos[index].handler.get('title');

     titleList.push(title);
     }

     documentTitle = titleList.join(' - ');

     document.title = documentTitle;

     googleAnalytics('send', 'pageview', {
     title: documentTitle
     });
     }
     });
     */

    App.Router.map(function () {
        this.resource('login');

        this.resource('lobby', function () {
            this.route('index',
                {
                    path: ':lobby_id'
                });
            this.route('edit',
                {
                    path: ':lobby_id/edit'
                });
            this.route('delete',
                {
                    path: ':lobby_id/delete'
                });
            this.route('list');
            this.route('create');
        });

        this.resource('player', function () {
            this.route('index',
                {
                    path: ':player_id'
                });
            this.route('edit',
                {
                    path: ':player_id/edit'
                });
            this.route('delete',
                {
                    path: ':player_id/delete'
                });
            this.route('list');
            this.route('create');
        });
    });
});

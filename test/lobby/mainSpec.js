/* jshint browser: true */
define(function(require) {
    'use strict';

    var App = require('init/app');

    describe('Lobby-describe', function() {
        it('Lobby-it', function() {
            runs(function() {
                waitsFor(function() {
                    return window.isAppInitialized;
                }, 'App never initialized!', 10000);

                runs(function() {
                    expect(App.Lobby.FIXTURES.length).toBe(4);
                });
            });
        });
    });
});

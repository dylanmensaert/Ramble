'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Player = require('../api/bs-models/player');

passport.serializeUser(function (player, done) {
    done(null, player.id);
});

passport.deserializeUser(function (id, done) {
    Player.forge({id: id}).fetchWithRelated().then(function (player) {
        done(null, player);
    });
});

module.exports.express = {
    customMiddleware: function (app) {
        var player;

        passport.use(new LocalStrategy(function (username, password, done) {
            Player.forge({username: username}).fetchWithRelated().then(function (playerResult) {
                if (!playerResult) {
                    done(null, false);
                } else {
                    player = playerResult;

                    return player.verifyPassword(password);
                }
            }).then(function (isValid) {
                    if (!isValid) {
                        done(null, false);
                    } else {
                        done(null, player);
                    }
                });
        }));

        app.use(passport.initialize());
        app.use(passport.session());
    }
};

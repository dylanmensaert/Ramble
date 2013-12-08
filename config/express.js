'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    Player = require('../api/bs-models/player');

passport.serializeUser(function (player, done) {
    done(null, player.id);
});

passport.deserializeUser(function (id, done) {
    Player.forge({id: id}).fetch().then(function (player) {
        done(null, player);
    });
});

module.exports.express = {
    customMiddleware: function (app) {
        passport.use(new LocalStrategy(function (username, password, done) {
            Player.forge({username: username}).fetch().then(function (player) {
                if (!player) {
                    done(null, false);
                } else {
                    //TODO: Call toJSON() or just use .attributes?
                    player = player.toJSON();

                    bcrypt.compare(password, player.password, function (error, isValid) {
                        if (error) {
                            done(error);
                        } else if (!isValid) {
                            done(null, false);
                        } else {
                            done(null, player);
                        }
                    });
                }
            });
        }));

        app.use(passport.initialize());
        app.use(passport.session());
    }
};

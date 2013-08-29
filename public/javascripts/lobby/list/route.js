define(function (require) {
    "use strict";

    var Ember = require("Ember"),
        App = require("App");

    return Ember.Route.extend({
        model: function () {
            return App.Lobby.find();
        }
    });
});

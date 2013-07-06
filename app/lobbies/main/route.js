define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.Route.extend({
        model : function () {
            return App.Lobby.find();
        }
    });
});

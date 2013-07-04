define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.Route.extend({
        title : "Lobbies",
        //TODO: redirect to Search route
        isLeaf : true,
        model : function () {
            return App.Lobby.find();
        }
    });
});
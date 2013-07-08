define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("lobbiesController.documentTitle") + " - Create";
        }).property("lobbiesController.documentTitle"),
        isLeaf : true,
        needs : ["lobbies"],
        lobbiesControllerBinding : "controllers.lobbies",
        modelBinding : "lobbiesController",
        create : function () {
            var model = App.Lobby.createRecord({
                title : this.get("title"),
                maxPlayers : this.get("maxPlayers"),
                password : this.get("password")
            });

            model.one("didCreate", this, function () {
                this.transitionToRoute("lobby", model);
            });

            model.save();
        }
    });
});

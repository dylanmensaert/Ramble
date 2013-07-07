define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.lobbies.documentTitle") + " - Create";
        }).property("controllers.lobbies.documentTitle"),
        isLeaf : true,
        needs : ["lobbies"],
        createLobby : function () {
            var model = App.Lobby.createRecord({
                title : this.get("newTitle"),
                password : this.get("newPassword"),
                maxPlayers : this.get("newMaxPlayers")
            });

            model.save();

            this.transitionToRoute("lobbies");
        }
    });
});

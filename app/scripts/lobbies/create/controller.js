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

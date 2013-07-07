define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.players.documentTitle") + " - Create";
        }).property("controllers.players.documentTitle"),
        isLeaf : true,
        needs : ["players"],
        createPlayer : function () {
            var player = App.Player.createRecord({
                name : this.get("newName"),
                password : this.get("newPassword")
            });

            player.save();
            this.transitionToRoute("players");
        }
    });
});

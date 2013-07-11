define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            //TODO: Get title from index-controller, for less code-duplication
            return this._super() + " - " + this.get("title") + " - Delete";
        }).property("title", "controllers.lobby.documentTitle"),
        "delete" : function () {
            var model = this.get("model");

            model.deleteRecord();

            model.one("didDelete", this, function () {
                this.transitionToRoute("lobby.list");
            });

            //TODO: Associated players of this lobby don't get this lobby removed from their joinedLobbies-array.
            //this.removeLobbyFromItsJoinedPlayers(model);

            model.get("transaction").commit();
        },
        removeLobbyFromItsJoinedPlayers : function (model) {
            model.get("players").forEach(function (player) {
                player.get("joinedLobbies").removeObject(model);
            });
        }
    });
});

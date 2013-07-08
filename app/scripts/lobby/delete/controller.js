define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return "Delete - " + this._super();
        }).property("controllers.lobby.documentTitle"),
        doDelete : function (model) {
            model.deleteRecord();

            model.one("didDelete", this, function () {
                this.transitionToRoute("lobbies");
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

define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.lobby.documentTitle");
        }).property("controllers.lobby.documentTitle"),
        isLeaf : true,
        needs : ["lobby"],
        deletePlayerFromLobby : function (player) {
            //TODO: multiple relationship owner + players not working in model
            this.get("controllers.lobby.players").removeObject(player);
            this.get("controllers.lobby.players").save();
            //player.joinedLobbies.removeObject(this.get("controllers.lobby"));
        }
    });
});

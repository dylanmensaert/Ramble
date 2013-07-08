define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("lobbyController.documentTitle");
        }).property("lobbyController.documentTitle"),
        isLeaf : true,
        needs : ["lobby"],
        lobbyControllerBinding : "controllers.lobby",
        modelBinding : "lobbyController",
        kickPlayerFromLobby : function (player) {
            //TODO: multiple relationship owner + players not working in model
            this.get("players").removeObject(player);
            this.get("players").save();
        }
    });
});

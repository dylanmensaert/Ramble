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
        modelBinding : "controllers.lobby",
        kickPlayerFromLobby : function (player) {
            //TODO: multiple relationship owner + players not working in model
            this.get("players").removeObject(player);
            this.get("players").save();
        }
    });
});

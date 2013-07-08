define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return "Delete - " + this.get("lobbyController.documentTitle");
        }).property("lobbyController.documentTitle"),
        isLeaf : true,
        needs : ["lobby"],
        lobbyControllerBinding : "controllers.lobby",
        modelBinding : "lobbyController",
        doDelete : function (model) {
            model.one("didDelete", this, function () {
                this.transitionToRoute("lobbies");
            });

            model.deleteRecord();

            model.get("transaction").commit();
        }
    });
});

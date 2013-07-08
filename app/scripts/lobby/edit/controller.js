define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return "Edit - " + this.get("lobbyController.documentTitle");
        }).property("lobbyController.documentTitle"),
        isLeaf : true,
        needs : ["lobby"],
        lobbyControllerBinding : "controllers.lobby",
        modelBinding : "lobbyController",
        save : function (model) {
            if (model.get("isDirty")) {
                model.one("didUpdate", this, function () {
                    this.transitionToRoute("lobby");
                });

                model.save();
            } else {
                this.transitionToRoute("lobby");
            }
        }
    });
});

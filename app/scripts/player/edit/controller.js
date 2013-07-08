define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return "Edit - " + this.get("playerController.documentTitle");
        }).property("playerController.documentTitle"),
        isLeaf : true,
        needs : ["player"],
        playerControllerBinding : "controllers.player",
        modelBinding : "playerController",
        save : function (model) {
            if (model.get("isDirty")) {
                model.one("didUpdate", this, function () {
                    this.transitionToRoute("player");
                });

                model.save();
            } else {
                this.transitionToRoute("player");
            }
        }
    });
});

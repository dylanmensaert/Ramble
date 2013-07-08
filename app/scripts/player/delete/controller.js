define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return "Delete - " + this.get("playerController.documentTitle");
        }).property("playerController.documentTitle"),
        isLeaf : true,
        needs : ["player"],
        playerControllerBinding : "controllers.player",
        modelBinding : "playerController",
        doDelete : function (model) {
            model.one("didDelete", this, function () {
                this.transitionToRoute("index");
            });

            model.deleteRecord();

            model.get("transaction").commit();
        }
    });
});

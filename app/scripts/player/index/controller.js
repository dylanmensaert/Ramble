define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("playerController.documentTitle");
        }).property("playerController.documentTitle"),
        isLeaf : true,
        needs : ["player"],
        playerControllerBinding : "controllers.player",
        modelBinding : "playerController"
    });
});

define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return "Edit - " + this.get("controllers.player.documentTitle");
        }).property("controllers.player.documentTitle"),
        isLeaf : true,
        needs : ["player"],
        modelBinding : "controllers.player",
        saveEdits : function (model) {
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

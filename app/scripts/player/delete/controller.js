define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return "Delete - " + this.get("controllers.player.documentTitle");
        }).property("controllers.player.documentTitle"),
        isLeaf : true,
        needs : ["player"],
        modelBinding : "controllers.player",
        doDelete : function (model) {
            model.deleteRecord();

            model.one("didDelete", this, function () {
                this.transitionToRoute("index");
            });

            model.save();
        }
    });
});

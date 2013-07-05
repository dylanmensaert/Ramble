define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.player.documentTitle");
        }).property("controllers.player.documentTitle"),
        isLeaf : true,
        needs : ["player"]
    });
});

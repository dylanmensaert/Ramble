define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.player.documentTitle") + " - List";
        }).property("controllers.player.documentTitle"),
        isLeaf : true,
        needs : ["player"]
    });
});

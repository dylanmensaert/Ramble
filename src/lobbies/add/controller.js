define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.lobbies.documentTitle") + " - Add";
        }).property("controllers.lobbies.documentTitle"),
        isLeaf : true,
        needs : ["lobbies"]
    });
});

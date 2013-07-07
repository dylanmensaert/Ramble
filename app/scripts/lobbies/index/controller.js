define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.lobbies.documentTitle");
        }).property("controllers.lobbies.documentTitle"),
        isLeaf : true,
        needs : ["lobbies"],
        contentBinding : "controllers.lobbies"
    });
});

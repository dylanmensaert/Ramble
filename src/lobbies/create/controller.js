define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.lobbies.documentTitle") + " - Create";
        }).property("controllers.lobbies.documentTitle"),
        isLeaf : true,
        needs : ["lobbies"]
    });
});
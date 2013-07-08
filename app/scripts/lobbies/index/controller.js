define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("lobbiesController.documentTitle");
        }).property("lobbiesController.documentTitle"),
        isLeaf : true,
        needs : ["lobbies"],
        lobbiesControllerBinding : "controllers.lobbies",
        modelBinding : "lobbiesController"
    });
});

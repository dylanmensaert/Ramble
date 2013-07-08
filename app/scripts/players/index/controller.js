define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("playersController.documentTitle");
        }).property("playersController.documentTitle"),
        isLeaf : true,
        needs : ["players"],
        playersControllerBinding : "controllers.players",
        modelBinding : "playersController"
    });
});

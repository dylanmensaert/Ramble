define([
    "Ember"
], function (Ember) {
    "use strict";

    //TODO: Should use mixin for controller instead of extend
    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.lobby.documentTitle") + " - List";
        }).property("controllers.lobby.documentTitle"),
        isLeaf : true,
        needs : ["lobby"]
    });
});

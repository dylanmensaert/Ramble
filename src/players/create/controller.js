define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ArrayController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("controllers.players.documentTitle") + " - Create";
        }).property("controllers.players.documentTitle"),
        isLeaf : true,
        needs : ["players"]
    });
});

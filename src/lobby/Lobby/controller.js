define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("title");
        }).property("title"),
        isLeaf : false,
        amountOfPlayers : Ember.computed(function() {
            return this.get("players.length");
        }).property("players.@each")
    });
});

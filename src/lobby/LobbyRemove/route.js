define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        title : Ember.computed(function () {
            return "Remove - " + this.modelFor("lobby").get("title");
        }).property("controller.title"),
        isLeaf : true
    });
});
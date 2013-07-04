define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        title : Ember.computed(function () {
            return this.modelFor("lobby").get("title");
        }).property("controller.title"),
        isLeaf : false
    });
});
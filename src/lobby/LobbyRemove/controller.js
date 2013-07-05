define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return "Remove - " + this.get("title");
        }).property("title"),
        isLeaf : true
    });
});

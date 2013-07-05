define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return "Edit - " + this.get("title");
        }).property("title"),
        isLeaf : true
    });
});

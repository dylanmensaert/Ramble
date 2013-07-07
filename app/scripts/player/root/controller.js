define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.ObjectController.extend({
        documentTitle : Ember.computed(function () {
            return this.get("username");
        }).property("username"),
        isLeaf : false
    });
});

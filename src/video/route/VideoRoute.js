define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        title : Ember.computed(function () {
            var video = this.modelFor("video");

            return "Video - " + video.get("title") + "/" + video.get("author");
        }).property("controller.title", "controller.author"),
        isLeaf : false
    });
});
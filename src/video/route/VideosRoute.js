define([
    "Ember", "App"
], function (Ember, App) {
    "use strict";

    return Ember.Route.extend({
        title : "Videos",
        isLeaf : true,
        model : function () {
            return App.Video.find();
        }
    });
});
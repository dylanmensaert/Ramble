define([
    "Ember"
], function (Ember) {
    "use strict";

    return Ember.Route.extend({
        title : "Index",
        isLeaf : true,
        redirect : function () {
            this.transitionTo("lobbies");
        }
    });
});

define([
    "lobby/helpers/controller"
], function (Controller) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return this._super() + this.get("title");
        }).property("title", "controllers.lobby.documentTitle"),
        //TODO: Change to server side functionality
        leave : function () {
            this.get("players").removeObject(this.get("controllers.application.account"));
            this.get("transaction").commit();

            this.transitionToRoute("lobby.list");
        },
        kick : function (player) {
            this.get("players").removeObject(player);
            this.get("transaction").commit();
        }
    });
});

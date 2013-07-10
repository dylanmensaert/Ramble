define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return this._super() + this.get("title");
        }).property("title", "controllers.lobby.documentTitle"),
        needs : ["application"],
        //TODO: Change to server side functionality
        leave : function () {
            this.get("players").removeObject(this.get("controllers.application.account"));
            this.get("transaction").commit();

            this.transitionToRoute("lobby.list");
        },
        kick : function (player) {
            this.get("players").removeObject(player);
            this.get("transaction").commit();
        },
        //TODO: Weird bug when binding account from application or login controller
        //accountBinding : "controllers.application.account",
        //isOwner : Ember.computed(function () {
        //    return this.get("account.id") === this.get("owner.id");
        //}).property("account.id", "owner.id"),
        isOwner : Ember.computed(function () {
            return this.get("controllers.application.account") === this.get("owner");
        }).property("controllers.application.account", "owner")
    });
});

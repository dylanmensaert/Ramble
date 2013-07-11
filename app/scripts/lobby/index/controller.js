define([
    "lobby/helpers/controller", "Ember"
], function (Controller, Ember) {
    "use strict";

    return Controller.extend({
        documentTitle : Ember.computed(function () {
            return this._super() + " - " + this.get("title");
        }).property("title", "controllers.lobby.documentTitle"),
        needs : ["application"],
        //TODO: Change to server side functionality
        leave : function () {
            this.get("model").one("didUpdate", this, function () {
                this.transitionToRoute("lobby.list");
            });

            this.get("players").removeObject(this.get("controllers.application.account"));
            this.get("transaction").commit();
        },
        kick : function (player) {
            this.get("players").removeObject(player);
            this.get("transaction").commit();
        },
        join : function () {
            var model = this.get("model");

            if (this.get("controllers.application.isLoggedIn")) {
                model.one("didUpdate", this, function () {
                    this.transitionToRoute("lobby.index", model);
                });

                model.get("players").pushObject(this.get("controllers.application.account"));
                model.get("transaction").commit();
            } else {
                this.transitionToRoute("login");
            }
        },
        //TODO: Weird bug when binding account from application or login controller
        //accountBinding : "controllers.application.account",
        //isOwner : Ember.computed(function () {
        //    return this.get("account.id") === this.get("owner.id");
        //}).property("account.id", "owner.id"),
        isOwnerOfLobby : Ember.computed(function () {
            return this.get("controllers.application.account") === this.get("owner");
        }).property("controllers.application.account", "owner"),
        isJoinedPlayerOfLobby : Ember.computed(function () {
            return this.get("isOwnerOfLobby")
                || this.get("players").contains(this.get("controllers.application.account"));
        }).property("controllers.application.account", "isOwnerOfLobby", "players")
    });
});
